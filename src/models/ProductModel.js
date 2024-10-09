const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  image: [String],
  category: String,
  price: Number,
  description: String,
  measurement: String,
  ownerEmail: String,
  quantity: Number,

//   update code 
  titles: [String],
  tax: Number,
  branch: String,
  add_ons_price: Number,
  sort_description: String,
});

module.exports = mongoose.model("products", productSchema);
