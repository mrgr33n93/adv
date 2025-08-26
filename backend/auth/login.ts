import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";

const jwtSecret = secret("JWTSecret");

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      avatarUrl?: string;
    };
  };
}

// Authenticates a user and returns a JWT token.
export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    const { email, password } = req;

    // Find user
    const user = await authDB.queryRow<{
      id: number;
      email: string;
      password_hash: string;
      role: string;
      is_active: boolean;
    }>`
      SELECT id, email, password_hash, role, is_active
      FROM users
      WHERE email = ${email}
    `;

    if (!user) {
      throw APIError.unauthenticated("Invalid credentials");
    }

    if (!user.is_active) {
      throw APIError.permissionDenied("Account is deactivated");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw APIError.unauthenticated("Invalid credentials");
    }

    // Get user profile
    const profile = await authDB.queryRow<{
      first_name?: string;
      last_name?: string;
      phone?: string;
      avatar_url?: string;
    }>`
      SELECT first_name, last_name, phone, avatar_url
      FROM user_profiles
      WHERE user_id = ${user.id}
    `;

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret(),
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: profile ? {
          firstName: profile.first_name || undefined,
          lastName: profile.last_name || undefined,
          phone: profile.phone || undefined,
          avatarUrl: profile.avatar_url || undefined,
        } : undefined,
      },
    };
  }
);
