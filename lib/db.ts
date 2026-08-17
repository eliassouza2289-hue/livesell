import { neon } from "@neondatabase/serverless";

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL não configurada");
  return neon(url);
}

export function companyId() {
  return process.env.DEMO_COMPANY_ID || "00000000-0000-0000-0000-000000000001";
}
