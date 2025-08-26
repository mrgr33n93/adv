import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const reviewsDB = SQLDatabase.named("lawyers");

export interface CreateReviewRequest {
  lawyerProfileId: number;
  reviewerName: string;
  reviewerEmail?: string;
  rating: number;
  comment?: string;
}

export interface Review {
  id: number;
  lawyerProfileId: number;
  reviewerName: string;
  rating: number;
  comment?: string;
  isApproved: boolean;
  createdAt: Date;
}

// Creates a new review for a lawyer.
export const createReview = api<CreateReviewRequest, Review>(
  { expose: true, method: "POST", path: "/reviews" },
  async (req) => {
    const { lawyerProfileId, reviewerName, reviewerEmail, rating, comment } = req;

    if (rating < 1 || rating > 5) {
      throw APIError.invalidArgument("Rating must be between 1 and 5");
    }

    // Check if lawyer profile exists
    const lawyerExists = await reviewsDB.queryRow`
      SELECT id FROM lawyer_profiles WHERE id = ${lawyerProfileId}
    `;

    if (!lawyerExists) {
      throw APIError.notFound("Lawyer profile not found");
    }

    // Create review
    const review = await reviewsDB.queryRow<{
      id: number;
      lawyer_profile_id: number;
      reviewer_name: string;
      rating: number;
      comment?: string;
      is_approved: boolean;
      created_at: Date;
    }>`
      INSERT INTO reviews (lawyer_profile_id, reviewer_name, reviewer_email, rating, comment)
      VALUES (${lawyerProfileId}, ${reviewerName}, ${reviewerEmail}, ${rating}, ${comment})
      RETURNING id, lawyer_profile_id, reviewer_name, rating, comment, is_approved, created_at
    `;

    if (!review) {
      throw APIError.internal("Failed to create review");
    }

    return {
      id: review.id,
      lawyerProfileId: review.lawyer_profile_id,
      reviewerName: review.reviewer_name,
      rating: review.rating,
      comment: review.comment,
      isApproved: review.is_approved,
      createdAt: review.created_at,
    };
  }
);
