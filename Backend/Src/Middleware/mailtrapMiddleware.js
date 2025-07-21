const { MailtrapClient } = require("mailtrap");
const { MAILTRAP_API_TOKEN, MAILTRAP_SENDER_EMAIL, MAILTRAP_SENDER_NAME } = require('../Config/MailtrapConfig');

const client = new MailtrapClient({ token: MAILTRAP_API_TOKEN });

/**
 * Send an email using Mailtrap Transactional API
 * @param {Object} options - { to, subject, html, text }
 * @returns {Promise}
 */
async function sendMailtrapEmail({ to, subject, html, text }) {
  const sender = {
    email: MAILTRAP_SENDER_EMAIL,
    name: MAILTRAP_SENDER_NAME,
  };
  const recipients = Array.isArray(to) ? to.map(email => ({ email })) : [{ email: to }];

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject,
      html,
      text,
      category: "User Registration",
    });
    console.log('Mailtrap API response:', response);
    return response;
  } catch (error) {
    console.error('Mailtrap send error:', error);
    throw new Error('Failed to send email');
  }
}

/**
 * Generate a professional welcome email HTML
 * @param {string} userName
 * @returns {string}
 */
function generateWelcomeEmailHTML(userName) {
    return `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fb; padding: 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(44,62,80,0.10);">
                <tr>
                    <td style="padding: 32px 40px 16px 40px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" width="64" height="64" alt="Welcome" style="margin-bottom: 16px;"/>
                        <h2 style="color: #2d7ff9; margin: 0 0 8px 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">Welcome to Beu!</h2>
                        <p style="color: #333; font-size: 18px; margin: 0;">Hi <b>${userName}</b>,</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 24px 40px 0 40px; color: #444; font-size: 16px; line-height: 1.7;">
                        <p style="margin: 0 0 16px 0;">Thank you for registering with <b>beuHelper</b>. We are excited to have you on board!</p>
                        <p style="margin: 0 0 16px 0;">You can now access all our features and get the best out of our platform. If you have any questions or need support, feel free to reply to this email.</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 32px 40px 24px 40px; text-align: center;">
                        <a href="https://beuhelper.com" style="display: inline-block; padding: 12px 32px; background: #2d7ff9; color: #fff; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: 600; letter-spacing: 1px;">Visit BeuHelper</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 0 40px 32px 40px; color: #888; font-size: 14px; text-align: center; border-top: 1px solid #f0f0f0;">
                        <p style="margin: 24px 0 0 0;">Best regards,<br/><b>beuHelper Team</b></p>
                        <p style="margin: 8px 0 0 0;">&copy; ${new Date().getFullYear()} beuHelper. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </div>
    `;
}

module.exports = { sendMailtrapEmail, generateWelcomeEmailHTML };
