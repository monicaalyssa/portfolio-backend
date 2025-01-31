require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

const { Resend } = require('resend');

const port = process.env.PORT || 5050;
const app = express();

const allowedOrigins = ['https://monicaalyssa.tech', 'https://monicaalyssa.vercel.app', 'https://nextjs-portfolio-three-gamma-38.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use(bodyParser.json());

const resendAPI = new Resend(process.env.RESEND_API_KEY);

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

   try {
   const response = await resendAPI.emails.send({
        // from: `Portfolio Message <noreply@monicaalyssa.tech>`,
        from: `Portfolio Message <onboarding@resend.dev>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New contact form submission message from ${name}!`,
        text: `Name: ${name}, Email: ${email}\n\nMessage: ${message}`
        })
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json ({ error: 'Failed to send.'})
    }
});

app.listen(port, () => {}) 