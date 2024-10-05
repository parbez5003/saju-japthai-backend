const express = require("express");
const router = express.Router();

// Import all routers
const routers = [

  require("./routers/ProductRouter"),
  require("./routers/cartsRoutes"),
  require("./routers/UserRouter"),
  //  todo payment 
  require("./routers/PaymentRoute"),
  require("./routers/JwtRoutes"),



];

// Dynamically apply routers
routers.forEach((route) => router.use(route));

module.exports = router;
