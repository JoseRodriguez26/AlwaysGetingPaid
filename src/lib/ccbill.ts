/**
 * CCBill Integration Helpers
 *
 * To activate:
 * 1. Sign up at ccbill.com
 * 2. Get your Client Account Number, Sub Account Number, and Flexform ID
 * 3. Add to .env.local:
 *    CCBILL_CLIENT_ACCOUNT=XXXXXX
 *    CCBILL_SUB_ACCOUNT=XXXX
 *    CCBILL_FLEXFORM_ID=XXXX
 *    CCBILL_SALT=your_salt_key
 */

export const CCBILL_CONFIG = {
  clientAccount: process.env.CCBILL_CLIENT_ACCOUNT ?? "",
  subAccount: process.env.CCBILL_SUB_ACCOUNT ?? "",
  flexformId: process.env.CCBILL_FLEXFORM_ID ?? "",
  salt: process.env.CCBILL_SALT ?? "",
};

export interface CCBillWebhookPayload {
  eventType: string;
  subscriptionId: string;
  clientAccnum: string;
  clientSubacc: string;
  timestamp: string;
  billedAmount?: string;
  billedCurrency?: string;
  subscriptionCycleNumber?: string;
  renewalDate?: string;
  username?: string;
  email?: string;
}

/**
 * Returns the CCBill FlexForm URL for a given subscription tier
 */
export function getCCBillFormUrl(tier: "fan" | "vip" | "elite"): string {
  const priceMap = { fan: "9.99", vip: "19.99", elite: "39.99" };
  const price = priceMap[tier];
  const { clientAccount, subAccount, flexformId } = CCBILL_CONFIG;

  // Replace with real CCBill FlexForm URL pattern from your dashboard
  return `https://api.ccbill.com/wap-frontflex/flexforms/${flexformId}?clientAccnum=${clientAccount}&clientSubacc=${subAccount}&initialPrice=${price}&initialPeriod=30&recurringPrice=${price}&recurringPeriod=30&numRebills=99`;
}

/**
 * Verify that a CCBill webhook is authentic using the shared salt
 */
export async function verifyCCBillWebhook(
  payload: Record<string, string>,
  receivedDigest: string
): Promise<boolean> {
  const { salt } = CCBILL_CONFIG;

  const dataString = Object.values(payload).join("") + salt;
  const encoder = new TextEncoder();
  const data = encoder.encode(dataString);

  const hashBuffer = await crypto.subtle.digest("MD5", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const computedDigest = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return computedDigest === receivedDigest;
}
