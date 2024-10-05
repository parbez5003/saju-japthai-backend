const express = require('express');
const PaymentControllers = require('../controllers/PaymentControllers');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

const PaymentRouter = express.Router();

// Order create route
PaymentRouter.post('/order', verifyToken, PaymentControllers.postOrder);

// Payment success route
PaymentRouter.post('/orderSuccess', verifyToken, PaymentControllers.orderSuccess);
PaymentRouter.get('/myorders/:email', verifyToken, PaymentControllers.getMyOrders)
PaymentRouter.get('/allOrders', verifyToken, verifyAdmin, PaymentControllers.getAllOrders)

PaymentRouter.put('/updateOrder/:id', verifyToken, verifyAdmin, PaymentControllers.updateOrder)

module.exports = PaymentRouter;
