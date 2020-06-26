const express = require("express");
const router = express.Router();

const User = require("./../backendmodels/user");

router.post("", (req, res, next) => {
  const userLikedDetails = new User({
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPhone: req.body.userPhone,
    userCity: req.body.userCity,
    userGender: req.body.userGender,
    userLikedProducts: {
      prodId: req.body.userLikedProducts.prodId,
      message: req.body.userLikedProducts.message,
    },
  });

  userLikedDetails
    .save()
    .then((result) => {
      //console.log(result);
      res.status(200).json({ message: "Success!" });
    })
    .catch((err) => {
      console.log("some error occured while posting user data!", err);
    });
});
module.exports = router;
