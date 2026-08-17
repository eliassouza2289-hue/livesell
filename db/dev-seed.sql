INSERT INTO companies (id, name, slug, founder)
VALUES ('00000000-0000-0000-0000-000000000001', 'Loja Demonstração', 'demo', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO subscriptions (company_id, plan_id, status, trial_ends_at)
VALUES ('00000000-0000-0000-0000-000000000001', 'pro', 'trialing', now() + interval '14 days')
ON CONFLICT (company_id) DO NOTHING;

INSERT INTO products (company_id, code, name, stock, full_price, live_price)
VALUES
('00000000-0000-0000-0000-000000000001', '1001', 'Kit Hidratação Premium', 17, 49.90, 39.90),
('00000000-0000-0000-0000-000000000001', '1002', 'Protetor Solar FPS 60', 22, 59.90, 49.90),
('00000000-0000-0000-0000-000000000001', '1003', 'Vitamina C Facial', 9, 39.90, 32.90),
('00000000-0000-0000-0000-000000000001', '1004', 'Shampoo Fortalecedor', 31, 34.90, 29.90)
ON CONFLICT (company_id, code) DO NOTHING;
