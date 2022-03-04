const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add product name"],
    },
    description: {
      type: String,
      required: [true, "Please add product description"],
    },
    category: {
      type: String,
      required: [true, "Please add product description"],
      enum: {
        values: [
          "Clothing",
          "ShoesJewelry",
          "Books",
          "GroceryGourmetFood",
          "Arts",
          "CraftsSewing",
          "Electronics",
        ],
        message: "{VALUE} is not supported",
      },
      default: "Clothing",
    },
    inStock: {
      type: Boolean,
      required: [true, "Please add products count"],
    },
    price: {
      type: Number,
      required: [true, "Please add product price"],
    },
    countInStock: {
      type: Number,
      required: [true, "Please number of availablre products"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please add product image"],
    },
  },
  {
    timestamps: true /* to add createdAt and updatedAt fields automatically */,
  }
);

module.exports = mongoose.model("Product", productSchema);
