require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Carts = require("../models/CartsModel");
const Orders = require("../models/OrdersModel");

const mongoose = require("mongoose");

exports.postOrder = async (req, res) => {
  try {
    const { email } = req.body;
    const cartItems = await Carts.find({ customer_email: email });

    if (!cartItems.length) {
      return res
        .status(404)
        .json({ success: false, message: "Le panier est vide" }); // French: 'Cart is empty'
    }

    // Calculate total price in cents
    const totalPrice = Math.round(
      cartItems.reduce(
        (sum, item) => sum + item.unit_price * item.quantity,
        0
      ) * 100
    );

    // console.log("totalproce" , totalPrice);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice, // Amount in cents
      currency: "eur",
      receipt_email: email,
      // You can set locale here if needed, but usually it's handled by the Stripe checkout or Elements configuration
    });

    res
      .status(200)
      .json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      success: false,
      message: "Échec du paiement, veuillez réessayer",
    }); // French: 'Payment failed, please try again'
  }
};

exports.orderSuccess = async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      transactionId,
      total_amount,
      foods,
      status,
      road_number,
      address,
      complement_address,
      post_code,
      district,
    } = req.body;

    let totalAmountInEuros;
    if (parseInt(total_amount) > 100) {
      totalAmountInEuros = parseFloat(total_amount) / 100;
    } else {
      totalAmountInEuros = parseFloat(total_amount);
    }


    const newOrder = new Orders({
      customer_name,
      customer_email,
      transactionId,
      total_amount: totalAmountInEuros,
      isPaid: status === "success",
      isDelivered: false,
      isOrderCancel: false,
      date: new Date(),
      status,
      foods,
      road_number,
      address,
      complement_address,
      post_code,
      district,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Commande créée avec succès",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de la commande",
      error: error.message,
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(404).json({ message: "Email Not Found  " });
    }
    const filter = { customer_email: email };
    const orders = await Orders.find(filter);

    res.send(orders);
  } catch (error) {
    console.error("Error getting my order data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  get all orders products

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getIsNotAllArchiveOrders = async (req, res) => {
  try {
    const orders = await Orders.find({ isArchived: false });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIsAllArchiveOrders = async (req, res) => {
  try {
    const orders = await Orders.find({ isArchived: true });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Backend route to update order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    // Find the order by ID and update it with the new data from req.body
    const updateOrder = await Orders.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    // If the order is not found, return a 404 response
    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Send the updated order as a response
    res.json(updateOrder);
  } catch (error) {
    // Catch any errors and return a 500 response with the error message
    res.status(500).json({ message: error.message });
  }
};

// update 9-10-2024

// Archive a single order
exports.archiveOrder = async (req, res) => {
  try {
    const { id } = req.params; // Get order ID from params

    // Mark the order as archived
    const archivedOrder = await Orders.findByIdAndUpdate(
      id,
      {
        isArchived: true,
        archivedAt: new Date(),
      },
      { new: true }
    );

    if (!archivedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order archived successfully", archivedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Archive multiple orders
exports.archiveOrders = async (req, res) => {
  try {
    const { ids } = req.body; // Array of order IDs

    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: "No order IDs provided" });
    }

    const archivedOrders = await Orders.updateMany(
      { _id: { $in: ids } },
      { $set: { isArchived: true, archivedAt: new Date() } }
    );

    if (archivedOrders.nModified === 0) {
      return res
        .status(404)
        .json({ message: "No orders found with provided IDs" });
    }

    res.status(200).json({
      message: `Successfully archived ${archivedOrders.nModified} orders`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  end
