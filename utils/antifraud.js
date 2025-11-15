export function checkFraud({ userId, ip, watchTime, visibilityOk }) {
  if (!visibilityOk) return { valid: false, reason: "not_visible" };
  if (watchTime < 3000) return { valid: false, reason: "too_short" };
  // Add heuristics: same IP flood, many quick views, etc.
  return { valid: true };
}
