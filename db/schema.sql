CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS plans (
  id text PRIMARY KEY,
  name text NOT NULL,
  monthly_price_cents integer NOT NULL,
  max_users integer,
  max_products integer,
  features jsonb NOT NULL DEFAULT '{}'::jsonb,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE,
  logo_url text,
  founder boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  auth_user_id text NOT NULL,
  role text NOT NULL DEFAULT 'operator',
  display_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(company_id, auth_user_id)
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL UNIQUE REFERENCES companies(id) ON DELETE CASCADE,
  plan_id text NOT NULL REFERENCES plans(id),
  status text NOT NULL DEFAULT 'trialing',
  trial_ends_at timestamptz,
  current_period_ends_at timestamptz,
  provider_customer_id text,
  provider_subscription_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  code text NOT NULL,
  barcode text,
  name text NOT NULL,
  stock numeric(12,3) NOT NULL DEFAULT 0,
  full_price numeric(12,2) NOT NULL DEFAULT 0,
  live_price numeric(12,2) NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(company_id, code)
);

CREATE INDEX IF NOT EXISTS products_company_name_idx ON products(company_id, lower(name));
CREATE INDEX IF NOT EXISTS products_company_barcode_idx ON products(company_id, barcode);

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  instagram_handle text,
  name text,
  whatsapp text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(company_id, instagram_handle)
);

CREATE TABLE IF NOT EXISTS lives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz
);

CREATE TABLE IF NOT EXISTS sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  live_id uuid REFERENCES lives(id) ON DELETE SET NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  customer_handle text,
  status text NOT NULL DEFAULT 'pending',
  total numeric(12,2) NOT NULL DEFAULT 0,
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS sales_company_created_idx ON sales(company_id, created_at DESC);

CREATE TABLE IF NOT EXISTS sale_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  quantity numeric(12,3) NOT NULL DEFAULT 1,
  unit_price numeric(12,2) NOT NULL DEFAULT 0,
  subtotal numeric(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO plans (id, name, monthly_price_cents, max_users, max_products, features)
VALUES
  ('essential', 'Essencial', 4900, 1, 2000, '{"reports":"basic","branding":false,"multi_store":false}'::jsonb),
  ('pro', 'Pro', 9900, 3, NULL, '{"reports":"advanced","branding":true,"multi_store":false,"export":true}'::jsonb),
  ('business', 'Business', 19900, 10, NULL, '{"reports":"management","branding":true,"multi_store":true,"roles":true,"ranking":true}'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  monthly_price_cents = EXCLUDED.monthly_price_cents,
  max_users = EXCLUDED.max_users,
  max_products = EXCLUDED.max_products,
  features = EXCLUDED.features;
