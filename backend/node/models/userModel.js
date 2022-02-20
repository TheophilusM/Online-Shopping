const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
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
      default: "level 0",
    },
  },
  {
    timestamps: true /* to add createdAt and updatedAt fields automatically */,
  }
);

module.exports = mongoose.model("User", userSchema);
