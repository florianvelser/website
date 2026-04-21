require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 5, // max. 5 Anfragen pro IP
    message: 'Too many requests!'
});

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

async function sendContactEmail({ name, email, message }) {
    const mailOptions = {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM}>`,
        to: process.env.MAIL_RECEIVER,
        replyTo: email,
        subject: `Neue Nachricht von ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nNachricht:\n${message}`
    };

    await transporter.sendMail(mailOptions);
}


const app = express();
app.set('trust proxy', 1);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/contact-form', contactLimiter, async (req, res) => {
    const { name, email, message, 'g-recaptcha-response': token } = req.body;

    // 1. Eingaben validieren
    if (!name || name.trim().length < 2) {
        return res.status(400).send('Please enter a valid name.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).send('Please enter a valid email adress.');
    }

    if (!message || message.trim().length < 5) {
        return res.status(400).send('Message is too short.');
    }

    if (!token) {
        return res.status(400).send('reCAPTCHA Token missing.');
    }

    // 2. reCAPTCHA Validierung
    const secret = process.env.RECAPTCHA_SECRET;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

    try {
        const response = await axios.post(verificationUrl);
        if (!response.data.success) {
            return res.status(400).send('reCAPTCHA Validation failed');
        }

        // Nachricht verarbeiten
        console.log({ name, email, message });
        await sendContactEmail({ name, email, message });

        res.send('Message sent!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server läuft auf Port ${process.env.PORT}`);
});
