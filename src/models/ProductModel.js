const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: [String],
  category: String,
  price: { type: Number, required: true },
  description: String,
  measurement: String,
  ownerEmail: String,
  quantity: Number,

  // Titles and Prices
  titles: {
    type: Map,
    of: [
      {
        name: { type: String },
        price: { type: Number, default: null },
      },
    ],
  },
  tax: { type: Number, default: 0 },
  branch: String,
});

module.exports = mongoose.model("products", productSchema);
