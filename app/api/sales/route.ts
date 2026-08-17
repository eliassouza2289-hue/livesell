import { db, companyId, hasDatabase } from "@/lib/db";
import { z } from "zod";

const payloadSchema = z.object({
  customerHandle: z.string().min(1),
  productId: z.string().uuid(),
  productName: z.string().min(1),
  quantity: z.number().positive().default(1),
  unitPrice: z.number().nonnegative(),
});

export async function POST(request: Request) {
  if (!hasDatabase()) {
    return Response.json({ error: "Banco ainda não configurado" }, { status: 503 });
  }

  const parsed = payloadSchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const p = parsed.data;
  const sql = db();
  const tenant = companyId();
  const total = p.quantity * p.unitPrice;

  const rows = await sql`
    WITH customer_upsert AS (
      INSERT INTO customers (company_id, instagram_handle)
      VALUES (${tenant}, ${p.customerHandle})
      ON CONFLICT (company_id, instagram_handle)
      DO UPDATE SET updated_at = now()
      RETURNING id
    ), stock_update AS (
      UPDATE products
      SET stock = stock - ${p.quantity}, updated_at = now()
      WHERE company_id = ${tenant}
        AND id = ${p.productId}
        AND stock >= ${p.quantity}
      RETURNING id
    ), sale_insert AS (
      INSERT INTO sales (company_id, customer_id, customer_handle, total)
      SELECT ${tenant}, customer_upsert.id, ${p.customerHandle}, ${total}
      FROM customer_upsert, stock_update
      RETURNING id
    )
    INSERT INTO sale_items (company_id, sale_id, product_id, product_name, quantity, unit_price)
    SELECT ${tenant}, sale_insert.id, ${p.productId}, ${p.productName}, ${p.quantity}, ${p.unitPrice}
    FROM sale_insert
    RETURNING sale_id
  `;

  if (!rows.length) {
    return Response.json({ error: "Produto sem estoque suficiente ou não encontrado" }, { status: 409 });
  }

  return Response.json({ ok: true, saleId: rows[0].sale_id });
}
