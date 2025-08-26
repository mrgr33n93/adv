import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: "admin" | "premium" | "basic";
}

export interface RegisterResponse {
  id: number;
  email: string;
  role: string;
}

// Registers a new user in the system.
export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    const { email, password, firstName, lastName, role = "basic" } = req;

    // Check if user already exists
    const existingUser = await authDB.queryRow`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("User with this email already exists");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await authDB.queryRow<{ id: number; email: string; role: string }>`
      INSERT INTO users (email, password_hash, role)
      VALUES (${email}, ${passwordHash}, ${role})
      RETURNING id, email, role
    `;

    if (!user) {
      throw APIError.internal("Failed to create user");
    }

    // Create user profile if name provided
    if (firstName || lastName) {
      await authDB.exec`
        INSERT INTO user_profiles (user_id, first_name, last_name)
        VALUES (${user.id}, ${firstName || ""}, ${lastName || ""})
      `;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
);
