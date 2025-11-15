module.exports = {
  ai: {
    userPercent: parseInt(process.env.AI_AD_PERCENTAGE_USER || '20', 10),
    adminPercent: parseInt(process.env.AI_AD_PERCENTAGE_ADMIN || '80', 10)
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  }
};
