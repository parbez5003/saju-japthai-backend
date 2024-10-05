const mongoose = require('mongoose');
const Carts = require('./CartsModel').schema;

const ordersSchema = new mongoose.Schema({

  customer_email: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    // required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
  },
  isDelivered: {
    type: Boolean,
    required: true,
  },
  isOrderCancel: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'success', 'failed'],
  },


  //  data update 
  
  road_number: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },
  complement_address: {
    type: String,
    // required: true
  },
  post_code: {
    type: Number,
    required: true
  },
  
  district: {
    type: String,
    required: true
  },







  foods: [Carts],
});

const Orders = mongoose.model('Orders', ordersSchema);
module.exports = Orders;
