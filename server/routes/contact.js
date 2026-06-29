const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// --------------------------------------------------
// Nodemailer transporter (Gmail)
// --------------------------------------------------
const createTransporter = () =>
  nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

// --------------------------------------------------
// POST /api/contact  →  Save enquiry + Send emails
// --------------------------------------------------
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Basic validation
    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    // 1️⃣  Save to MongoDB
    const newContact = new Contact({ fullName, email, phone, subject, message });
    await newContact.save();

    // 2️⃣  Send notification email to Pradeep
    const transporter = createTransporter();

    const ownerMailOptions = {
      from: `"Portfolio Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📩 New Enquiry: ${subject}`,
      html: `
        <div style="font-family:Poppins,sans-serif;max-width:600px;margin:auto;background:#1f242d;color:#fff;border-radius:10px;overflow:hidden;">
          <div style="background:#7cf03d;padding:20px;text-align:center;">
            <h1 style="color:#1f242d;margin:0;font-size:24px;">New Portfolio Enquiry</h1>
          </div>
          <div style="padding:30px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;color:#7cf03d;font-weight:600;width:130px;">Name</td><td style="padding:10px 0;">${fullName}</td></tr>
              <tr><td style="padding:10px 0;color:#7cf03d;font-weight:600;">Email</td><td style="padding:10px 0;"><a href="mailto:${email}" style="color:#7cf03d;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;color:#7cf03d;font-weight:600;">Phone</td><td style="padding:10px 0;">${phone}</td></tr>
              <tr><td style="padding:10px 0;color:#7cf03d;font-weight:600;">Subject</td><td style="padding:10px 0;">${subject}</td></tr>
            </table>
            <hr style="border:1px solid #323946;margin:20px 0;">
            <p style="color:#7cf03d;font-weight:600;margin-bottom:8px;">Message:</p>
            <p style="background:#323946;padding:15px;border-radius:8px;line-height:1.7;">${message.replace(/\n/g, '<br>')}</p>
            <p style="color:#aaa;font-size:12px;margin-top:20px;">Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          </div>
        </div>
      `,
    };

    // 3️⃣  Send auto-reply to the visitor
    const visitorMailOptions = {
      from: `"Pradeep S | Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${fullName}! ✅`,
      html: `
        <div style="font-family:Poppins,sans-serif;max-width:600px;margin:auto;background:#1f242d;color:#fff;border-radius:10px;overflow:hidden;">
          <div style="background:#7cf03d;padding:20px;text-align:center;">
            <h1 style="color:#1f242d;margin:0;font-size:24px;">Message Received!</h1>
          </div>
          <div style="padding:30px;">
            <p>Hi <strong>${fullName}</strong>,</p>
            <p style="line-height:1.8;margin:15px 0;">
              Thank you for getting in touch! I've received your message and will get back to you as soon as possible — usually within 24 hours.
            </p>
            <div style="background:#323946;padding:15px;border-radius:8px;margin:20px 0;">
              <p style="margin:0;color:#7cf03d;font-weight:600;">Your message:</p>
              <p style="margin-top:8px;line-height:1.7;">"${message.replace(/\n/g, '<br>')}"</p>
            </div>
            <p>Meanwhile, feel free to connect with me on:</p>
            <div style="margin:15px 0;">
              <a href="https://github.com/Pradeep-2004-S" style="color:#7cf03d;margin-right:15px;">GitHub</a>
              <a href="https://www.linkedin.com/in/pradeeps07" style="color:#7cf03d;margin-right:15px;">LinkedIn</a>
              <a href="https://www.instagram.com/pradeep_p0705" style="color:#7cf03d;">Instagram</a>
            </div>
            <hr style="border:1px solid #323946;margin:20px 0;">
            <p style="color:#aaa;font-size:13px;">Best regards,<br><strong style="color:#7cf03d;">Pradeep S</strong><br>Front-End Developer</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(visitorMailOptions);

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! I will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact route error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

// --------------------------------------------------
// GET /api/contact  →  Retrieve all enquiries (admin)
// --------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
