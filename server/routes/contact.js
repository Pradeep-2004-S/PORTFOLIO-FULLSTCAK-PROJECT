const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { TransactionalEmailsApi, SendSmtpEmail } = require('@getbrevo/brevo');

const sendEmail = async ({ to, subject, html }) => {
 const client = new TransactionalEmailsApi();
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

await client.sendTransacEmail({
    sender: { name: 'Pradeep Portfolio', email: 'pradeepp54980@gmail.com' },
    to: [{ email: to }],
    subject,
    htmlContent: html,
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

    await sendEmail({
      to: process.env.EMAIL_TO,
      subject: `📩 New Enquiry: ${subject}`,
      html: `
        <div style="font-family:Poppins,sans-serif;max-width:600px;margin:auto;background:#1f242d;color:#fff;border-radius:10px;overflow:hidden;">
          <div style="background:#7cf03d;padding:20px;text-align:center;">
            <h1 style="color:#1f242d;margin:0;">New Portfolio Enquiry</h1>
          </div>
          <div style="padding:30px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;color:#7cf03d;font-weight:600;width:130px;">Name</td><td>${fullName}</td></tr>
              <tr><td style="padding:10px 0;color:#7cf03d;font-weight:600;">Email</td><td>${email}</td></tr>
              <tr><td style="padding:10px 0;color:#7cf03d;font-weight:600;">Phone</td><td>${phone}</td></tr>
              <tr><td style="padding:10px 0;color:#7cf03d;font-weight:600;">Subject</td><td>${subject}</td></tr>
            </table>
            <hr style="border:1px solid #323946;margin:20px 0;">
            <p style="color:#7cf03d;font-weight:600;">Message:</p>
            <p style="background:#323946;padding:15px;border-radius:8px;">${message}</p>
          </div>
        </div>
      `,
    });

    await sendEmail({
      to: email,
      subject: `Thanks for reaching out, ${fullName}! ✅`,
      html: `
        <div style="font-family:Poppins,sans-serif;max-width:600px;margin:auto;background:#1f242d;color:#fff;border-radius:10px;overflow:hidden;">
          <div style="background:#7cf03d;padding:20px;text-align:center;">
            <h1 style="color:#1f242d;margin:0;">Message Received!</h1>
          </div>
          <div style="padding:30px;">
            <p>Hi <strong>${fullName}</strong>,</p>
            <p>Thank you for reaching out! I will get back to you within 24 hours.</p>
            <div style="background:#323946;padding:15px;border-radius:8px;margin:20px 0;">
              <p style="color:#7cf03d;font-weight:600;">Your message:</p>
              <p>${message}</p>
            </div>
            <p style="color:#aaa;font-size:13px;">Best regards,<br><strong style="color:#7cf03d;">Pradeep S</strong><br>MERN Stack Developer</p>
          </div>
        </div>
      `,
    });

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