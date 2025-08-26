import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import { lawyersDB } from "./db";

export interface ListLawyersRequest {
  page?: Query<number>;
  limit?: Query<number>;
  cityId?: Query<number>;
  specialtyId?: Query<number>;
  minRating?: Query<number>;
  minExperience?: Query<number>;
  isPremium?: Query<boolean>;
  search?: Query<string>;
}

export interface LawyerListItem {
  id: number;
  userId: number;
  oabNumber: string;
  firmName?: string;
  bio?: string;
  experienceYears: number;
  city?: {
    id: number;
    name: string;
  };
  address?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
  isPremium: boolean;
  rating: number;
  totalReviews: number;
  profileImageUrl?: string;
  specialties: Array<{
    id: number;
    name: string;
  }>;
}

export interface ListLawyersResponse {
  lawyers: LawyerListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Lists lawyers with filtering and pagination.
export const listLawyers = api<ListLawyersRequest, ListLawyersResponse>(
  { expose: true, method: "GET", path: "/lawyers" },
  async (req) => {
    const {
      page = 1,
      limit = 20,
      cityId,
      specialtyId,
      minRating,
      minExperience,
      isPremium,
      search,
    } = req;

    const offset = (page - 1) * limit;

    // Build WHERE conditions
    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (cityId) {
      conditions.push(`lp.city_id = $${paramIndex++}`);
      params.push(cityId);
    }

    if (specialtyId) {
      conditions.push(`EXISTS (
        SELECT 1 FROM lawyer_specialties ls 
        WHERE ls.lawyer_profile_id = lp.id AND ls.specialty_id = $${paramIndex++}
      )`);
      params.push(specialtyId);
    }

    if (minRating) {
      conditions.push(`lp.rating >= $${paramIndex++}`);
      params.push(minRating);
    }

    if (minExperience) {
      conditions.push(`lp.experience_years >= $${paramIndex++}`);
      params.push(minExperience);
    }

    if (isPremium !== undefined) {
      conditions.push(`lp.is_premium = $${paramIndex++}`);
      params.push(isPremium);
    }

    if (search) {
      conditions.push(`(
        lp.firm_name ILIKE $${paramIndex++} OR 
        lp.bio ILIKE $${paramIndex} OR
        lp.oab_number ILIKE $${paramIndex}
      )`);
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `
      SELECT COUNT(DISTINCT lp.id) as total
      FROM lawyer_profiles lp
      LEFT JOIN cities c ON lp.city_id = c.id
      ${whereClause}
    `;

    const countResult = await lawyersDB.rawQueryRow<{ total: number }>(countQuery, ...params);
    const total = countResult?.total || 0;

    // Get lawyers
    const lawyersQuery = `
      SELECT DISTINCT
        lp.id, lp.user_id, lp.oab_number, lp.firm_name, lp.bio,
        lp.experience_years, lp.address, lp.website_url, lp.linkedin_url,
        lp.instagram_url, lp.whatsapp_number, lp.is_premium, lp.rating,
        lp.total_reviews, lp.profile_image_url,
        c.id as city_id, c.name as city_name
      FROM lawyer_profiles lp
      LEFT JOIN cities c ON lp.city_id = c.id
      ${whereClause}
      ORDER BY lp.is_premium DESC, lp.rating DESC, lp.total_reviews DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;

    params.push(limit, offset);

    const lawyers = await lawyersDB.rawQueryAll<{
      id: number;
      user_id: number;
      oab_number: string;
      firm_name?: string;
      bio?: string;
      experience_years: number;
      address?: string;
      website_url?: string;
      linkedin_url?: string;
      instagram_url?: string;
      whatsapp_number?: string;
      is_premium: boolean;
      rating: number;
      total_reviews: number;
      profile_image_url?: string;
      city_id?: number;
      city_name?: string;
    }>(lawyersQuery, ...params);

    // Get specialties for each lawyer
    const lawyerIds = lawyers.map(l => l.id);
    const specialties = lawyerIds.length > 0 ? await lawyersDB.rawQueryAll<{
      lawyer_profile_id: number;
      specialty_id: number;
      specialty_name: string;
    }>(
      `SELECT ls.lawyer_profile_id, s.id as specialty_id, s.name as specialty_name
       FROM lawyer_specialties ls
       JOIN specialties s ON ls.specialty_id = s.id
       WHERE ls.lawyer_profile_id = ANY($1)`,
      lawyerIds
    ) : [];

    // Group specialties by lawyer
    const specialtiesMap = new Map<number, Array<{ id: number; name: string }>>();
    for (const specialty of specialties) {
      if (!specialtiesMap.has(specialty.lawyer_profile_id)) {
        specialtiesMap.set(specialty.lawyer_profile_id, []);
      }
      specialtiesMap.get(specialty.lawyer_profile_id)!.push({
        id: specialty.specialty_id,
        name: specialty.specialty_name,
      });
    }

    const result: LawyerListItem[] = lawyers.map(lawyer => ({
      id: lawyer.id,
      userId: lawyer.user_id,
      oabNumber: lawyer.oab_number,
      firmName: lawyer.firm_name,
      bio: lawyer.bio,
      experienceYears: lawyer.experience_years,
      city: lawyer.city_id ? {
        id: lawyer.city_id,
        name: lawyer.city_name!,
      } : undefined,
      address: lawyer.address,
      websiteUrl: lawyer.website_url,
      linkedinUrl: lawyer.linkedin_url,
      instagramUrl: lawyer.instagram_url,
      whatsappNumber: lawyer.whatsapp_number,
      isPremium: lawyer.is_premium,
      rating: Number(lawyer.rating),
      totalReviews: lawyer.total_reviews,
      profileImageUrl: lawyer.profile_image_url,
      specialties: specialtiesMap.get(lawyer.id) || [],
    }));

    return {
      lawyers: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
);
