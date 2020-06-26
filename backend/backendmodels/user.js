const mongoose = require("mongoose");
const { collection } = require("./product");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
    },
    userPhone: {
      type: Number,
      required: true,
    },
    userCity: {
      type: String,
    },
    userGender: {
      type: String,
      required: true,
    },

    userLikedProducts: {
      prodId: { type: String, required: true },
      message: { type: String },
    },
    liked_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Users",
  }
);

module.exports = mongoose.model("User", userSchema);
