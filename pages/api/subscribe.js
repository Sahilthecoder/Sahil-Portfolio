// @ts-nocheck - Disable TypeScript checking for this file
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your Service ID and Template ID
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  try {
    // Prepare email template parameters
    const templateParams = {
      to_email: email,
      from_name: 'Sahil Ali',
      from_email: process.env.EMAIL_FROM || 'noreply@sahilali.dev',
      subject: '🎉 Welcome to My Newsletter!',
      message: `Hi there,\n\nThank you for subscribing to my newsletter! I'm excited to share my latest updates, projects, and insights with you.`,
      html_message: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 10px;">Welcome to My Newsletter! 🎉</h1>
            <p style="color: #4b5563; line-height: 1.6;">Thank you for subscribing. I'm excited to share my latest updates, projects, and insights with you.</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1f2937; font-size: 18px; margin-top: 0;">What to expect:</h2>
            <ul style="padding-left: 20px; color: #4b5563;">
              <li>Latest blog posts and tutorials</li>
              <li>Project updates and case studies</li>
              <li>Exclusive content and resources</li>
              <li>Occasional personal updates</li>
            </ul>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px;">
            If you didn't sign up for this newsletter, you can safely ignore this email.
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Sahil Ali. All rights reserved.<br>
              <a href="https://sahilali.dev" style="color: #3b82f6; text-decoration: none;">sahilali.dev</a> · 
              <a href="https://sahilali.dev/privacy" style="color: #3b82f6; text-decoration: none;">Privacy Policy</a>
            </p>
          </div>
        </div>
      `,
    };

    // Send confirmation email to admin
    const adminEmail = {
      to: process.env.ADMIN_EMAIL || 'your-email@example.com',
      from: process.env.EMAIL_FROM || 'Sahil Ali <noreply@sahilali.dev>',
      subject: `New Newsletter Subscriber: ${email}`,
      text: `New subscriber: ${email}\n\nTotal subscribers: [You can add this if you're tracking in a database]`,
    };

    await Promise.all([
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      ),
      // Uncomment this if you want to receive notifications for new subscribers
      // sgMail.send(adminEmail)
    ]);

    // Here you would typically store the email in your database
    // For example: await saveSubscriber(email);

    return res.status(200).json({ message: 'Subscription successful! Please check your email.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: 'Failed to process subscription',
      details: error.message,
    });
  }
}
