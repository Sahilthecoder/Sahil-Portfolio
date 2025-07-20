import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  try {
    // Send welcome email
    const welcomeEmail = {
      to: email,
      from: process.env.EMAIL_FROM || 'Sahil Ali <noreply@sahilali.dev>',
      subject: '🎉 Welcome to My Newsletter!',
      text: `Hi there,\n\nThank you for subscribing to my newsletter! I'm excited to share my latest updates, projects, and insights with you.\n\nBest regards,\nSahil Ali\n\n---\nYou're receiving this email because you signed up for updates from sahilali.dev`,
      html: `
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
      sgMail.send(welcomeEmail),
      // Uncomment this if you want to receive notifications for new subscribers
      // sgMail.send(adminEmail)
    ]);

    // Here you would typically save the email to your database
    // For now, we'll just return success
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      error: error.response?.body?.errors?.[0]?.message || 'Failed to subscribe. Please try again.'
    });
  }
}
