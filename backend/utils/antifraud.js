const checkBasic = ({ watchTime, visibilityOk }) => {
  if (!visibilityOk) return { valid:false, reason:'visibility' };
  if (!watchTime || watchTime < 3000) return { valid:false, reason:'short' };
  // Additional heuristics can be added: IP frequency, rapid repeat views, UA checks
  return { valid:true };
};

module.exports = { checkBasic };
