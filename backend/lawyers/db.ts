import { SQLDatabase } from "encore.dev/storage/sqldb";

export const lawyersDB = new SQLDatabase("lawyers", {
  migrations: "./migrations",
});
