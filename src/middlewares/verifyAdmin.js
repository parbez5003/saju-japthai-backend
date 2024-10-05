const Users = require("../models/UserModel");

const verifyAdmin = async (req, res, next) => {
  const email = req.user?.email;
  const user = await Users.findOne({ email });
  if (!user || !user.isAdmin) {
    return res.status(403).send({ message: "Forbidden access" });
  }
  next();
};

module.exports = verifyAdmin;
