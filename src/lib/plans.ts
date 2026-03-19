export const PLANS = {
  starter: {
    name: "Starter",
    price: 49,
    features: ["500 DMs/month", "10 Schedules/month", "5 Analytics reports", "ARIA-7 + MUSE-3 + PRISM"],
  },
  pro: {
    name: "Pro",
    price: 149,
    features: ["2,000 DMs/month", "50 Schedules/month", "20 Analytics reports", "All agents + Studio access"],
  },
  empire: {
    name: "Empire",
    price: 299,
    features: ["Unlimited DMs", "Unlimited Schedules", "Unlimited Analytics", "All agents + Priority support"],
  },
};

export type PlanId = keyof typeof PLANS;
