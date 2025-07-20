const { MailtrapClient } = require("mailtrap");
const { MAILTRAP_API_TOKEN, MAILTRAP_SENDER_EMAIL, MAILTRAP_SENDER_NAME } = require('../Config/MailtrapConfig');

const client = new MailtrapClient({ token: MAILTRAP_API_TOKEN });
console.log(MAILTRAP_API_TOKEN);
console.log(MAILTRAP_SENDER_EMAIL);
console.log(MAILTRAP_SENDER_NAME);


async function sendMailtrapEmail({ to, subject, html, text }) {
  const sender = {
    email: MAILTRAP_SENDER_EMAIL,
    name: MAILTRAP_SENDER_NAME,
  };
  const recipients = Array.isArray(to) ? to.map(email => ({ email })) : [{ email: to }];

  return client.send({
    from: sender,
    to: recipients,
    subject,
    html,
    text,
    category: "User Registration",
  });
}

/**
 * Generate a professional welcome email HTML
 * @param {string} userName
 * @returns {string}
 */
function generateWelcomeEmailHTML(userName) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 24px;">
            <h2 style="color: #2d7ff9;">Welcome to Beu!</h2>
            <p>Hi <b>${userName}</b>,</p>
            <p>Thank you for registering with <b>beuHelper</b>. We are excited to have you on board!</p>
            <p>If you have any questions or need support, feel free to reply to this email.</p>
            <br/>
            <p>Best regards,<br/><b>beuHelper Team</b></p>
        </div>
    `;
}

module.exports = { sendMailtrapEmail, generateWelcomeEmailHTML }; 