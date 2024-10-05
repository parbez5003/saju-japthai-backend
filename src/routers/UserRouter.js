const express = require("express");
const verifyAdmin = require("../middlewares/verifyAdmin");
const userControllers = require('../controllers/UserController');
const verifyToken = require("../middlewares/verifyToken");

const usersRoute = express.Router();



usersRoute.get("/users", verifyToken, verifyAdmin, userControllers.getAllUsers);
usersRoute.get("/users/:email",verifyToken, userControllers.getOneUser);
usersRoute.post("/users", userControllers.createUser);
usersRoute.patch("/users/:id", verifyToken, userControllers.updateUser);




module.exports = usersRoute;
