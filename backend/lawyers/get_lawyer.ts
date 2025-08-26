import { api, APIError } from "encore.dev/api";
import { lawyersDB } from "./db";

export interface GetLawyerRequest {
  id: number;
}

export interface LawyerDetails {
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
  coverImageUrl?: string;
  specialties: Array<{
    id: number;
    name: string;
    description?: string;
  }>;
  reviews: Array<{
    id: number;
    reviewerName: string;
    rating: number;
    comment?: string;
    createdAt: Date;
  }>;
  caseGallery: Array<{
    id: number;
    title: string;
    description?: string;
    imageUrl?: string;
    caseType?: string;
    resultSummary?: string;
    isFeatured: boolean;
  }>;
}

// Gets detailed information about a specific lawyer.
export const getLawyer = api<GetLawyerRequest, LawyerDetails>(
  { expose: true, method: "GET", path: "/lawyers/:id" },
  async (req) => {
    const { id } = req;

    // Get lawyer profile
    const lawyer = await lawyersDB.queryRow<{
      id: number;
      user_id: number;
      oab_number: string;
      firm_name?: string;
      bio?: string;
      experience_years: number;
      city_id?: number;
      city_name?: string;
      address?: string;
      website_url?: string;
      linkedin_url?: string;
      instagram_url?: string;
      whatsapp_number?: string;
      is_premium: boolean;
      rating: number;
      total_reviews: number;
      profile_image_url?: string;
      cover_image_url?: string;
    }>`
      SELECT 
        lp.id, lp.user_id, lp.oab_number, lp.firm_name, lp.bio,
        lp.experience_years, lp.address, lp.website_url, lp.linkedin_url,
        lp.instagram_url, lp.whatsapp_number, lp.is_premium, lp.rating,
        lp.total_reviews, lp.profile_image_url, lp.cover_image_url,
        lp.city_id, c.name as city_name
      FROM lawyer_profiles lp
      LEFT JOIN cities c ON lp.city_id = c.id
      WHERE lp.id = ${id}
    `;

    if (!lawyer) {
      throw APIError.notFound("Lawyer not found");
    }

    // Get specialties
    const specialties = await lawyersDB.queryAll<{
      id: number;
      name: string;
      description?: string;
    }>`
      SELECT s.id, s.name, s.description
      FROM lawyer_specialties ls
      JOIN specialties s ON ls.specialty_id = s.id
      WHERE ls.lawyer_profile_id = ${id}
    `;

    // Get reviews
    const reviews = await lawyersDB.queryAll<{
      id: number;
      reviewer_name: string;
      rating: number;
      comment?: string;
      created_at: Date;
    }>`
      SELECT id, reviewer_name, rating, comment, created_at
      FROM reviews
      WHERE lawyer_profile_id = ${id} AND is_approved = true
      ORDER BY created_at DESC
      LIMIT 10
    `;

    // Get case gallery
    const caseGallery = await lawyersDB.queryAll<{
      id: number;
      title: string;
      description?: string;
      image_url?: string;
      case_type?: string;
      result_summary?: string;
      is_featured: boolean;
    }>`
      SELECT id, title, description, image_url, case_type, result_summary, is_featured
      FROM case_gallery
      WHERE lawyer_profile_id = ${id}
      ORDER BY is_featured DESC, created_at DESC
    `;

    return {
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
      coverImageUrl: lawyer.cover_image_url,
      specialties: specialties.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description,
      })),
      reviews: reviews.map(r => ({
        id: r.id,
        reviewerName: r.reviewer_name,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.created_at,
      })),
      caseGallery: caseGallery.map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        imageUrl: c.image_url,
        caseType: c.case_type,
        resultSummary: c.result_summary,
        isFeatured: c.is_featured,
      })),
    };
  }
);
