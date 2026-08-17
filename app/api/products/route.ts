import { db, companyId, hasDatabase } from "@/lib/db";

export async function GET() {
  if (!hasDatabase()) return Response.json({ configured: false, products: [] });
  const sql = db();
  const rows = await sql`SELECT id, code, barcode, name, stock, full_price, live_price FROM products WHERE company_id = ${companyId()} AND active = true ORDER BY name LIMIT 5000`;
  return Response.json({ configured: true, products: rows });
}
