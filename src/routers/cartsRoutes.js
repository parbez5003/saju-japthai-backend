const express = require('express');
const { getMyCartsController, getOneCartController, postCartController, postManyCartsConroller, updateCartController, deleteCartController, deleteMyCartsController } = require('../controllers/cartsControllers');

const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

const cartsRouter = express.Router();


// get all carts by customer email
cartsRouter.get("/myCarts/:email", verifyToken, getMyCartsController)

// get one cart by id
cartsRouter.get("/myCarts/:id", verifyToken, getOneCartController)

// post a cart todo
cartsRouter.post("/myCarts/:email", verifyToken, postCartController)

// post many cart
cartsRouter.post("/carts", verifyToken, postManyCartsConroller)

// update a cart
cartsRouter.patch("/myCarts/:id", verifyToken, updateCartController)

// delete a cart by id
cartsRouter.delete("/myCarts/:id", verifyToken, deleteCartController)

// delete my all carts by email
cartsRouter.delete("/deleteCarts/:email", verifyToken, deleteMyCartsController)


module.exports = cartsRouter;