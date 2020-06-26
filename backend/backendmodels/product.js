const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productname: {
    type: String,
    required: true,
    trim: true,
  },
  producttype: {
    type: String,
    required: true,
  },
  imgurl: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
