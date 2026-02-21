export const CASHAPP_CONFIG = {
  cashtag: process.env.NEXT_PUBLIC_CASHAPP_TAG ?? "$YourCashTag",
  amount: "39.99",
};

export function getCashAppLink(amount?: string): string {
  const tag = CASHAPP_CONFIG.cashtag.replace("$", "");
  const amt = amount ?? CASHAPP_CONFIG.amount;
  return `https://cash.app/$${tag}/${amt}`;
}
