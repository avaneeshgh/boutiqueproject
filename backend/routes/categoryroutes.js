const express = require("express");
const router = express.Router();
const Product = require("./../backendmodels/product");

//getting Products of each specified category and queryParams
router.get("/:cname", (req, res, next) => {
  //getting collectionname
  const cname = req.params.cname;

  //getting queryparams
  const currentPage = +req.query.currentPage;
  const minPrice = +req.query.minPrice;
  const maxPrice = +req.query.maxPrice;

  let fetchedProducts;

  const productQuery = Product.find({
    producttype: cname,
    price: { $lte: maxPrice, $gte: minPrice },
  });

  if (currentPage) {
    //skip some elements
    productQuery.skip(12 * (currentPage - 1)).limit(12);
  }

  productQuery
    .then((docs) => {
      fetchedProducts = docs;
      return Product.countDocuments({
        producttype: cname,
        price: { $lte: maxPrice, $gte: minPrice },
      });
    })
    .then((counted) => {
      res.status(200).json({
        message: "success",
        currentCollectionProductsBetweenMinAndMax: fetchedProducts,
        currentCollectionProductsCountBetweenMinAndMax: counted,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Couldn't get products! Try Again.." });
      console.log(
        "some error occured while getting the category products",
        err
      );
    });
});

//getting countofeachproduct by post request

router.post("", (req, res, next) => {
  const cname = req.body.cname;

  Product.countDocuments({ producttype: cname })
    .then((counted) => {
      res.status(200).json({ pcount: counted });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error Occured!" });
      console.log("some error occured while counting the data", err);
    });
});

module.exports = router;
