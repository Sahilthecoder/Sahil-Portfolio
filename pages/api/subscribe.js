import emailjs from '@emailjs/nodejs';

let emailjsInitialized = false;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  try {
    // Initialize EmailJS once per runtime (avoid multiple init calls)
    if (!emailjsInitialized) {
      emailjs.init({
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      });
      emailjsInitialized = true;
    }

    const recipientName = (name || '').trim() || 'there';
    const todayDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const currentYear = new Date().getFullYear();

    // Prepare template parameters for subscriber welcome email
    const templateParams = {
      to_email: email,
      to_name: recipientName,
      from_name: 'Sahil Ali',
      reply_to: 'sahilali.dev@gmail.com',
      subject: '🎉 Welcome to My Newsletter!',
      message: 'Thank you for subscribing to my newsletter!',
      email: email,
      user_email: email,
      user_name: recipientName,
      current_year: currentYear,
      year: currentYear,
      date: todayDate,
    };

    // Send welcome email to subscriber
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    // Send admin notification email if configured
    if (process.env.EMAILJS_ADMIN_TEMPLATE_ID && process.env.ADMIN_EMAIL) {
      try {
        await emailjs.send(
          process.env.EMAILJS_SERVICE_ID,
          process.env.EMAILJS_ADMIN_TEMPLATE_ID,
          {
            to_email: process.env.ADMIN_EMAIL,
            from_name: 'Portfolio Contact Form',
            subject: 'New Newsletter Subscriber',
            message: `New subscriber: ${recipientName} (${email})`,
            date: todayDate,
          },
          {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_KEY,
          }
        );
      } catch (adminError) {
        console.error('Admin notification failed:', adminError);
        // Don’t fail overall if admin email fails
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({
      error: 'Failed to process subscription. Please try again later.',
    });
  }
}
