const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    phone: {
      type: String,
      required: [true, "Please add your phone number"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: String,
      // enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    lastScene: {
      type: Date,
      default: Date.now(),
    },
    authCode: {
      type: String,
      expires: "3m",
      default: "",
    },
  },
  {
    timestamps: true /* to add createdAt and updatedAt fields automatically */,
  }
);

module.exports = mongoose.model("User", userSchema);
