const express = require("express");
const router = express.Router();
const Product = require("./../backendmodels/product");
const jwt = require("jsonwebtoken");

//login-function
// _id = 5edf8e38dd04a37a13cddec6
router.post("", (req, res, next) => {
  //get username and password
  const username = req.body.username;
  const password = req.body.password;

  //console.log(username, password);

  Product.findById("5edf8e38dd04a37a13cddec6")
    .then((doc) => {
      //doc found checking
      if (username == "madhusudhan1974@gmail.com" && password == "ambika9703") {
        return true;
      } else {
        return false;
      }
    })
    .then((result) => {
      console.log(result);
      //result false
      if (!result) {
        return res
          .status(401)
          .json({ message: "Invalid Authentication Credentials!" });
      }
      //result true
      const token = jwt.sign(
        {
          email: "madhusudhan1974@gmail.com",
          ownerid: "5edf8e38dd04a37a13cddec6",
        },
        "avaneesh-loves-soumya-forever",
        { expiresIn: "1h" }
      );

      //sending response
      res.status(200).json({ token: token, expiresIn: 3600 });
    })
    .catch((err) => {
      //other errors
      console.log("some error occured while authenticating", err);
      res.status(401).json({ message: "Invalid Authentication Credentials!" });
    });
});

module.exports = router;
