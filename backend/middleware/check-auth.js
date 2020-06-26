//middleware to check valid token on the backend

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "avaneesh-loves-soumya-forever");
    //if above line doesnt throw error then next()
    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication of admin failed" });
  }
};
