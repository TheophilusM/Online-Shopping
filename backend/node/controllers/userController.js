const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const uuid = require("uuid");

// @desc Authenticated User
// @route GET /api/users
// @access Private
const getMe = asyncHandler(async (req, res) => {
  // Get logged in user data
  const { _id, name, email, active, deleted, admin } = await User.findById(
    req.userID.id
  );
  res.status(200).json({
    _id,
    name,
    email,
    active,
    deleted,
    admin,
  });
});

// @desc Authenticate User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //   Check if user email exists
  const userExist = await User.findOne({ email });

  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    res.status(200).json({
      _id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      token: generateToken(userExist._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Register New User
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //   Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //   Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      deleted: user.deleted,
      admin: user.admin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

// @desc All Users
// @route GET /api/users/all
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users) {
    res.status(400);
    throw new Error("No users found");
  }

  res.status(200).json(users);
});

// @desc All Active Users
// @route GET /api/users/active
// @access Private
const getActiveUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ active: true });

  if (!users) {
    res.status(400);
    throw new Error("No users found");
  }

  res.status(200).json(users);
});

// @desc All Inactive Users
// @route GET /api/users/inactive
// @access Private
const getInactiveUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ active: false });

  if (!users) {
    res.status(400);
    throw new Error("No users found");
  }

  res.status(200).json(users);
});

// @desc All Deleted User Accounts
// @route GET /api/users/deleted
// @access Private
const getDeletedUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ deleted: true });

  if (!users) {
    res.status(400);
    throw new Error("No users found");
  }

  res.status(200).json(users);
});

// @desc Delete A User
// @route DELETE /api/users/delete/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("No such user found");
  }

  const deleted = await User.deleteOne({ _id: req.params.id });

  if (deleted) {
    res.status(200).json(`Deleted User: ${req.userID.id}`);
  }
});

// @desc Activate User
// @route PATCH /api/users/activate/:id
// @access Private
const activateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("No such user found");
  }

  const update = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!update) {
    res.status(400);
    throw new Error("Failed to activate user");
  }

  if (update) {
    res.status(200).json(user);
  }
});

// @desc Deactive User
// @route PATCH /api/users/deactivate/:id
// @access Private
const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("No such user found");
  }

  const update = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!update) {
    res.status(400);
    throw new Error("Failed to activate user");
  }

  if (update) {
    res.status(200).json(user);
  }
});

// @desc Update User Password
// @route PATCH /api/users/password/reset/:id
// @access Private
const updateUserPassword = asyncHandler(async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !newPassword || !oldPassword) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //   Check if user email exists
  const userExist = await User.findOne({ email });

  if (!userExist) {
    res.status(400);
    throw new Error("No such user");
  }

  if (!(await bcrypt.compare(oldPassword, userExist.password))) {
    res.status(400);
    throw new Error("Incorrect credentials");
  }
  //   Check if user old password is correct
  if (userExist && (await bcrypt.compare(oldPassword, userExist.password))) {
    //   Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatePassword = await User.findOneAndUpdate(
      { _id: req.params.id },
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!updatePassword) {
      res.status(400);
      throw new Error("Failed to update user password");
    }

    if (updatePassword) {
      res.status(200).json({ message: "Password updated sucessfully" });
    }
  } else {
    res.status(400);
    throw new Error("Incorrect Credentials");
  }
});

// @desc Update User Password with Link
// @route PATCH /api/users/password/reset/:id
// @access PUPLIC
const updateUserPasswordLink = asyncHandler(async (req, res) => {
  const { email, validation, newPassword } = req.body;

  if (!email || !newPassword || !validation) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //   Check if user email exists
  const userExist = await User.findOne({ email });

  if (!userExist) {
    res.status(400);
    throw new Error("No such user");
  }

  if (!(validation === userExist.name)) {
    res.status(400);
    throw new Error("Incorrect account validation");
  }

  //   Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const updatePassword = await User.findOneAndUpdate(
    { email: email },
    { password: hashedPassword },
    { new: true, runValidators: true }
  );

  if (!updatePassword) {
    res.status(400);
    throw new Error("Failed to update user password");
  }

  if (updatePassword) {
    res.status(200).json({ message: "Password reset successful" });
  }
});

// @desc Forgot Password
// @route GET /api/users/password/reset
// @access Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please add your registered email");
  }

  //   Check if user email exists
  const userExist = await User.findOne({ email });

  if (!userExist) {
    res.status(400);
    throw new Error("No such user");
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
    to: email, // receivers
    subject: "Password Reset", // Subject line
    html: `<div>
              <p style="
                  color:blue; 
                  font-weight: bold;">
                  Hello ${userExist.name}
              </p>
              <p>Here is your reset password <a href="">link</a></p>
              <p>
                If you don't want to reset your password, you can ignore this message - someone probably typed in your username or email address by mistake.
              </p>
            </div>`, // html body
  });

  if (!info) {
    res.status(400);
    throw new Error("Failed to send email");
  }

  console.log("Message sent: %s", info.response);

  res.status(200).send("Check your email for reset link");
});

// @desc Activate User
// @route PATCH /api/users/lastscene/:id
// @access Private
const userLastScene = asyncHandler(async (req, res) => {
  const update = await User.findOneAndUpdate(
    { _id: req.params.id },
    { lastScene: Date.now() },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!update) {
    console.log("Failed to update user last scene");
  }
  res.status(200).send("");
});

// @desc Verify Email
// @route PATCH /api/users/verify/email
// @access Private
const verifyEmail = asyncHandler(async (req, res) => {
  const id = uuid.v4();
  res.status(200).send(id.slice(0, 6).toLocaleUpperCase());
});

// @desc Verify Phone
// @route PATCH /api/users/verify/phone
// @access Private
const verifyPhone = asyncHandler(async (req, res) => {
  const id = uuid.v4();
  res.status(200).send(id.slice(0, 6).toLocaleUpperCase());
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  getMe,
  loginUser,
  deleteUser,
  verifyEmail,
  verifyPhone,
  getAllUsers,
  registerUser,
  activateUser,
  userLastScene,
  deactivateUser,
  getActiveUsers,
  forgotPassword,
  getDeletedUsers,
  getInactiveUsers,
  updateUserPassword,
  updateUserPasswordLink,
};
