// utils/email.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendResetEmail({ to, token }) {
  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Password Reset",
    text: `You requested a password reset. Click here to reset: ${resetURL}`,
    html: `<p>You requested a password reset.</p>
           <p>Click here to reset: <a href="${resetURL}">${resetURL}</a></p>`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendResetEmail,
};
