const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

// @desc Forgot Password
// @route POST /api/support/
// @access Public
const supportContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!email || !name || !message) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Send user reset password link to email
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: process.env.EMAIL_SUPPORT, // receiver(s)
    subject: "Enquiry", // Subject line
    html: `<div>
              <p>Sender Name: ${name}</p>
              <p>Sender Email: ${email}</p>
              <p>Sender Message: ${message}</p>
            </div>`,
  });

  if (!info) {
    res.status(400);
    throw new Error("Failed to send email");
  }

  res.status(200).send("Email sent successfully");
});

module.exports = { supportContact };
