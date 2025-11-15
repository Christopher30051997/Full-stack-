const getSplit = (value) => {
  const userP = parseInt(process.env.AI_AD_PERCENTAGE_USER || '20', 10);
  const user = Math.floor(value * userP / 100);
  const admin = value - user;
  return { user, admin };
};

module.exports = { getSplit };
