const Carts = require("../models/CartsModel");

// get my all carts by email
exports.getMyCartsController = async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { customer_email: email };
    const carts = await Carts.find(filter);

    res.send(carts);
  } catch (error) {
    console.error("Error getting my carts data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get one carts
exports.getOneCartController = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await Carts.findById(id);
    res.send(cart);
  } catch (error) {
    console.error("Error getting cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// add to cart

exports.postCartController = async (req, res) => {
  try {
    const cart = req.body;
    const email = req.params.email;
    const newCart = new Carts(cart);
    const result = await newCart.save();
    res.status(201).json(result); // Respond with 201 Created status
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// add to carts
exports.postManyCartsConroller = async (req, res) => {
  try {
    const email = req.params.email;
    const incomingCarts = req.body;

    // Retrieve existing carts for the user
    const filter = { customer_email: email };
    const existingCarts = await Carts.find(filter);

    const insertedIds = [];

    // Iterate over each incoming cart item
    for (const cart of incomingCarts) {
      // Check if the product already exists in the user's carts
      const existingProduct = existingCarts.find(item => item.product_id === cart.product_id);

      if (existingProduct) {
        // Product already exists, skip insertion
        continue;
      }

      // Create a new cart object
      const newCart = new Carts({
        ...cart,
      });

      const result = await newCart.save();
      insertedIds.push(result._id); // Store the inserted cart's ID
    }

    res.send({
      message: "Carts added successfully",
      insertedIds: insertedIds
    });
  } catch (error) {
    console.error("Error adding cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateCartController = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("update value: ", req.body);
    const result = await Carts.findByIdAndUpdate(id, req.body, { new: true });
    res.send(result);
  } catch (error) {
    console.error("Error update cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a cart
exports.deleteCartController = async (req, res) => {
  try {
    const result = await Carts.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    console.error("Error delete cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// delete my carts
exports.deleteMyCartsController = async (req, res) => {
  try {
    const email = req.params.email;
  
    const result = await Carts.deleteMany({ customer_email: email });
    res.send(result);
  } catch (error) {
    console.error("Error delete cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


