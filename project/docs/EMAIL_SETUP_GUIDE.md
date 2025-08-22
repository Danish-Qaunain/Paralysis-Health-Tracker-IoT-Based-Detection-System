# Email Functionality Setup Guide

## Option 1: EmailJS (Recommended - Free & Easy)

EmailJS allows you to send emails directly from the frontend without a backend server.

### Steps:

1. **Create EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Create Email Service**
   - Go to Email Services
   - Click "Add New Service"
   - Choose Gmail (or your preferred email provider)
   - Connect your `lifeneurohealth@gmail.com` account

3. **Create Email Template**
   - Go to Email Templates
   - Click "Create New Template"
   - Use this template:
   ```
   Subject: Contact Form: {{subject}}
   
   New message from Neuro Health Life website:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```

4. **Get Your Keys**
   - Service ID: Found in Email Services
   - Template ID: Found in Email Templates
   - Public Key: Found in Account > API Keys

5. **Update Environment Variables**
   ```bash
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

## Option 2: Web3Forms (Alternative)

1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Create free account
3. Get access key
4. Update `.env`:
   ```bash
   VITE_WEB3FORMS_ACCESS_KEY=your_access_key
   ```

## Option 3: Formspree (Alternative)

1. Go to [https://formspree.io/](https://formspree.io/)
2. Create account
3. Create new form
4. Get form ID
5. Update `.env`:
   ```bash
   VITE_FORMSPREE_FORM_ID=your_form_id
   ```

## Testing

1. Fill out the contact form
2. Check your `lifeneurohealth@gmail.com` inbox
3. Verify the email contains all form data

## Troubleshooting

- **EmailJS not working**: Check console for errors, verify all keys are correct
- **Gmail blocking**: Enable "Less secure app access" or use App Passwords
- **Spam folder**: Check if emails are going to spam

## Production Considerations

- Set up proper email authentication (SPF, DKIM)
- Consider using a dedicated email service for high volume
- Monitor email delivery rates
- Set up email templates for different inquiry types