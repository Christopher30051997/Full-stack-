export function calculateAdSplit(adValue) {
  const userP = parseInt(process.env.AI_AD_PERCENTAGE_USER || "20", 10);
  const user = Math.floor(adValue * userP / 100);
  const admin = adValue - user;
  return { user, admin };
}
