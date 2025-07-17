# Email Subscription System Setup

This guide will help you set up the email subscription system for your portfolio.

## 1. Create a SendGrid Account

1. Go to [SendGrid](https://sendgrid.com/) and sign up for a free account
2. Verify your email address
3. Create a new API key with "Full Access" permissions

## 2. Configure Environment Variables

1. Rename `.env.local.example` to `.env.local`
2. Update the following variables in `.env.local`:

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
EMAIL_FROM="Your Name <noreply@yourdomain.com>"
ADMIN_EMAIL=your-email@example.com
```

## 3. Verify Your Sender Identity (Required by SendGrid)

1. In SendGrid dashboard, go to Settings > Sender Authentication
2. Follow the wizard to verify your sender identity (Single Sender Verification)
3. You'll need to verify your email address

## 4. Deploy to Production

### Vercel Deployment
1. Go to your project in Vercel
2. Navigate to Settings > Environment Variables
3. Add the same environment variables from your `.env.local` file

### Netlify Deployment
1. Go to your site in Netlify
2. Navigate to Site settings > Build & deploy > Environment
3. Add the environment variables

## 5. Test the Subscription

1. Run your development server: `npm run dev`
2. Try subscribing with your email
3. Check your inbox for the welcome email

## Troubleshooting

- If emails are not being received, check the Vercel/Netlify logs for errors
- Make sure your SendGrid account is properly verified
- Check your spam folder if you don't see the welcome email

## Security Notes

- Never commit your `.env.local` file to version control
- The SendGrid API key should be kept secret
- Consider setting up domain authentication in SendGrid for better deliverability
