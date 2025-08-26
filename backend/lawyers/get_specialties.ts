import { api } from "encore.dev/api";
import { lawyersDB } from "./db";

export interface Specialty {
  id: number;
  name: string;
  description?: string;
}

export interface GetSpecialtiesResponse {
  specialties: Specialty[];
}

// Gets all available legal specialties.
export const getSpecialties = api<void, GetSpecialtiesResponse>(
  { expose: true, method: "GET", path: "/lawyers/specialties" },
  async () => {
    const specialties = await lawyersDB.queryAll<{
      id: number;
      name: string;
      description?: string;
    }>`
      SELECT id, name, description
      FROM specialties
      ORDER BY name
    `;

    return {
      specialties: specialties.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description,
      })),
    };
  }
);
