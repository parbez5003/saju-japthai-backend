const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_TOKEN = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {

  const token = req.cookies?.token;
  
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
