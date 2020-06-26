const express = require("express");
const router = express.Router();
const Product = require("./../backendmodels/product");

//import check-auth to validate-token in required routes
const checkAuth = require("./../middleware/check-auth");

router.post("", checkAuth, (req, res, next) => {
  //creation of model

  const product = new Product({
    productname: req.body.productname,
    producttype: req.body.producttype,
    imgurl: req.body.imgurl,
    price: req.body.price,
    description: req.body.description,
  });

  //saving to the database
  product
    .save()
    .then((doc) => {
      console.log(doc);
      //sending response
      res.status(201).json({
        message: "Successfully added to the database!",
        postid: doc._id,
      });
    })
    .catch((err) => {
      //sending err response
      res.status(500).json({ message: "Product not sent!" });
    });
});

//getting all products
router.get("", (req, res, next) => {
  //get products except _id = 5edf8e38dd04a37a13cddec6

  Product.find({ _id: { $ne: "5edf8e38dd04a37a13cddec6" } })
    .then((docs) => {
      //send response
      //console.log(docs);
      res
        .status(200)
        .json({ message: "successfully got products", products: docs });
    })
    .catch((err) => {
      console.log("some error occured while getting products", err);
    });
});

//getting single product

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Product.findOne({ _id: id })
    .then((doc) => {
      // console.log(doc);
      //response

      res.status(200).json({ message: "found product!", product: doc });
    })
    .catch((err) => {
      res.status(500).json({ message: "Getting product failed!" });
      console.log("some error occured while getting one product", err);
    });
});

//posting a product
router.put("/:id", checkAuth, (req, res, next) => {
  const id = req.params.id;

  const updatedProduct = {
    _id: id,
    productname: req.body.productname,
    producttype: req.body.producttype,
    imgurl: req.body.imgurl,
    price: req.body.price,
    description: req.body.description,
  };

  Product.updateOne({ _id: id }, updatedProduct)
    .then((mes) => {
      res.status(200).json({ message: "Product edit successful!!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Editing product failed!" });
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  const id = req.params.id;

  Product.deleteOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ message: "Product deletion successful!!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Deleting product failed!" });
      console.log("some error occured while deleting the product!", err);
    });
});

module.exports = router;
