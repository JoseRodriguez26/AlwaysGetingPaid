export const PLANS = {
  starter: {
    name: "Starter",
    price: 49,
    priceId: process.env.STRIPE_PRICE_STARTER ?? "",
    mpPriceId: process.env.MP_PLAN_STARTER ?? "",
    features: ["500 DMs/month", "10 Schedules/month", "5 Analytics reports", "ARIA-7 + MUSE-3 + PRISM"],
  },
  pro: {
    name: "Pro",
    price: 149,
    priceId: process.env.STRIPE_PRICE_PRO ?? "",
    mpPriceId: process.env.MP_PLAN_PRO ?? "",
    features: ["2,000 DMs/month", "50 Schedules/month", "20 Analytics reports", "All agents + Studio access"],
  },
  empire: {
    name: "Empire",
    price: 299,
    priceId: process.env.STRIPE_PRICE_EMPIRE ?? "",
    mpPriceId: process.env.MP_PLAN_EMPIRE ?? "",
    features: ["Unlimited DMs", "Unlimited Schedules", "Unlimited Analytics", "All agents + Priority support"],
  },
};

export type PlanId = keyof typeof PLANS;
