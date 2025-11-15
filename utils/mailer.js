export async function sendEmail(to, subject, html) {
  console.log("MAIL STUB ->", to, subject);
  // Integrate SendGrid, Mailgun or SMTP in production.
  return true;
}
