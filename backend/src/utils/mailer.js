/**
 * Configurable email notification utility
 * Safely handles missing credentials without pretending emails were sent.
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    console.warn(`[Mailer] Email not sent to ${to}. EMAIL_HOST / EMAIL_USER / EMAIL_PASS are not configured.`);
    return {
      sent: false,
      reason: 'Email provider credentials are not configured in environment variables.',
    };
  }

  try {
    // Dynamic import to avoid crash if nodemailer is not installed
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host,
      port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"PrimeWeb Studio" <no-reply@primewebstudio.com>',
      to,
      subject,
      text,
      html,
    });

    console.log(`[Mailer] Email delivered to ${to} (MessageId: ${info.messageId})`);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Mailer] Error sending email to ${to}:`, error.message);
    return { sent: false, error: error.message };
  }
};
