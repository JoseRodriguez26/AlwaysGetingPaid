-- No new tables needed — user_subscriptions already exists from tiers-schema.sql
-- This file documents the Stripe environment variables needed:

-- STRIPE_SECRET_KEY=sk_live_... (from Stripe Dashboard > Developers > API Keys)
-- STRIPE_WEBHOOK_SECRET=whsec_... (from Stripe Dashboard > Developers > Webhooks)
-- STRIPE_PRICE_STARTER=price_... (create in Stripe Dashboard > Products)
-- STRIPE_PRICE_PRO=price_...
-- STRIPE_PRICE_EMPIRE=price_...

-- MP_ACCESS_TOKEN=APP_USR-... (from Mercado Pago Developers > Credentials)
-- MP_PLAN_STARTER, MP_PLAN_PRO, MP_PLAN_EMPIRE (optional for MP subscriptions)

SELECT 'Stripe and Mercado Pago env vars documented above' as setup_note;
