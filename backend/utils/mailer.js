// Simple mail stub using nodemailer (configure production provider later)
const nodemailer = require('nodemailer');

const send = async (to, subject, html) => {
  console.log('MAIL STUB ->', to, subject);
  // In production replace with SendGrid / Mailgun / SMTP
  return true;
};

module.exports = { send };
