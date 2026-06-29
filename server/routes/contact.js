const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const https = require('https');

const sendBrevoEmail = (to, subject, htmlContent) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      sender: { name: 'Pradeep Portfolio', email: 'pradeepp54980@gmail.com' },
      to: [{ email: to }],
      subject,
      htmlContent,
    });

    const options = {
      hostname: 'api.brevo.com',
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve(body));
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
};

router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const newContact = new Contact({ fullName, email, phone, subject, message });
    await newContact.save();

    await sendBrevoEmail(
      process.env.EMAIL_TO,
      `📩 New Enquiry: ${subject}`,
      `<div style="font-family:sans-serif;background:#1f242d;color:#fff;padding:30px;border-radius:10px;">
        <h2 style="color:#7cf03d;">New Portfolio Enquiry</h2>
        <p><strong style="color:#7cf03d;">Name:</strong> ${fullName}</p>
        <p><strong style="color:#7cf03d;">Email:</strong> ${email}</p>
        <p><strong style="color:#7cf03d;">Phone:</strong> ${phone}</p>
        <p><strong style="color:#7cf03d;">Subject:</strong> ${subject}</p>
        <p><strong style="color:#7cf03d;">Message:</strong> ${message}</p>
      </div>`
    );

    await sendBrevoEmail(
      email,
      `Thanks for reaching out, ${fullName}! ✅`,
      `<div style="font-family:sans-serif;background:#1f242d;color:#fff;padding:30px;border-radius:10px;">
        <h2 style="color:#7cf03d;">Message Received!</h2>
        <p>Hi <strong>${fullName}</strong>,</p>
        <p>Thank you for reaching out! I will get back to you within 24 hours.</p>
        <p><strong style="color:#7cf03d;">Your message:</strong> ${message}</p>
        <p>Best regards,<br><strong style="color:#7cf03d;">Pradeep S</strong><br>MERN Stack Developer</p>
      </div>`
    );

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
    });

  } catch (error) {
    console.error('Contact route error:', error.message);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;