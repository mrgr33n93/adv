import { api } from "encore.dev/api";
import { lawyersDB } from "./db";

export interface City {
  id: number;
  name: string;
  state: string;
}

export interface GetCitiesResponse {
  cities: City[];
}

// Gets all cities in Mato Grosso.
export const getCities = api<void, GetCitiesResponse>(
  { expose: true, method: "GET", path: "/lawyers/cities" },
  async () => {
    const cities = await lawyersDB.queryAll<{
      id: number;
      name: string;
      state: string;
    }>`
      SELECT id, name, state
      FROM cities
      ORDER BY name
    `;

    return {
      cities: cities.map(c => ({
        id: c.id,
        name: c.name,
        state: c.state,
      })),
    };
  }
);
