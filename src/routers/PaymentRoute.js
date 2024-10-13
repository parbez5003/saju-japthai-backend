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
PaymentRouter.get('/isNotAllOrders', verifyToken, verifyAdmin, PaymentControllers.getIsNotAllArchiveOrders)

PaymentRouter.get('/isAllArchivedOrders', verifyToken, verifyAdmin, PaymentControllers.getIsAllArchiveOrders)

PaymentRouter.get('/getAllOrders', verifyToken, verifyAdmin, PaymentControllers.getAllOrders)

// Routes for archiving orders
PaymentRouter.post('/archiveOrder/:id', verifyToken, verifyAdmin, PaymentControllers.archiveOrder); // For single archive
PaymentRouter.post('/archiveOrders', verifyToken, verifyAdmin, PaymentControllers.archiveOrders); // For multiple archive


PaymentRouter.put('/updateOrder/:id', verifyToken, verifyAdmin, PaymentControllers.updateOrder)

module.exports = PaymentRouter;
