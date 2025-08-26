import { api, APIError } from "encore.dev/api";
import { lawyersDB } from "./db";

export interface CreateLawyerProfileRequest {
  userId: number;
  oabNumber: string;
  firmName?: string;
  bio?: string;
  experienceYears?: number;
  cityId?: number;
  address?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
  specialtyIds?: number[];
}

export interface LawyerProfile {
  id: number;
  userId: number;
  oabNumber: string;
  firmName?: string;
  bio?: string;
  experienceYears: number;
  cityId?: number;
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
}

// Creates a new lawyer profile.
export const createProfile = api<CreateLawyerProfileRequest, LawyerProfile>(
  { expose: true, method: "POST", path: "/lawyers/profile" },
  async (req) => {
    const {
      userId,
      oabNumber,
      firmName,
      bio,
      experienceYears = 0,
      cityId,
      address,
      websiteUrl,
      linkedinUrl,
      instagramUrl,
      whatsappNumber,
      specialtyIds = [],
    } = req;

    // Check if profile already exists
    const existingProfile = await lawyersDB.queryRow`
      SELECT id FROM lawyer_profiles WHERE user_id = ${userId}
    `;

    if (existingProfile) {
      throw APIError.alreadyExists("Lawyer profile already exists for this user");
    }

    // Check if OAB number is already taken
    const existingOab = await lawyersDB.queryRow`
      SELECT id FROM lawyer_profiles WHERE oab_number = ${oabNumber}
    `;

    if (existingOab) {
      throw APIError.alreadyExists("OAB number already registered");
    }

    // Create lawyer profile
    const profile = await lawyersDB.queryRow<{
      id: number;
      user_id: number;
      oab_number: string;
      firm_name?: string;
      bio?: string;
      experience_years: number;
      city_id?: number;
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
      INSERT INTO lawyer_profiles (
        user_id, oab_number, firm_name, bio, experience_years,
        city_id, address, website_url, linkedin_url, instagram_url, whatsapp_number
      )
      VALUES (
        ${userId}, ${oabNumber}, ${firmName}, ${bio}, ${experienceYears},
        ${cityId}, ${address}, ${websiteUrl}, ${linkedinUrl}, ${instagramUrl}, ${whatsappNumber}
      )
      RETURNING *
    `;

    if (!profile) {
      throw APIError.internal("Failed to create lawyer profile");
    }

    // Add specialties
    for (const specialtyId of specialtyIds) {
      await lawyersDB.exec`
        INSERT INTO lawyer_specialties (lawyer_profile_id, specialty_id)
        VALUES (${profile.id}, ${specialtyId})
      `;
    }

    return {
      id: profile.id,
      userId: profile.user_id,
      oabNumber: profile.oab_number,
      firmName: profile.firm_name,
      bio: profile.bio,
      experienceYears: profile.experience_years,
      cityId: profile.city_id,
      address: profile.address,
      websiteUrl: profile.website_url,
      linkedinUrl: profile.linkedin_url,
      instagramUrl: profile.instagram_url,
      whatsappNumber: profile.whatsapp_number,
      isPremium: profile.is_premium,
      rating: Number(profile.rating),
      totalReviews: profile.total_reviews,
      profileImageUrl: profile.profile_image_url,
      coverImageUrl: profile.cover_image_url,
    };
  }
);
