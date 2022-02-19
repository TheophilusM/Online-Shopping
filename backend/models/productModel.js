const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add product name"],
    },
  },
  {
    timestamps: true /* to add createdAt and updatedAt fields automatically */,
  }
);

module.exports = mongoose.model("Product", productSchema);
