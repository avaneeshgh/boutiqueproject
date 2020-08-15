//requiring express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Product = require("./backendmodels/product");

//routers
const ProductRoutes = require("./../backend/routes/productroutes");
const AdminLoginRoute = require("./../backend/routes/loginroute");
const CategoryRoutes = require("./routes/categoryroutes");
const UserRoutes = require("./routes/userroutes");

//using body-parser as middleware
app.use(bodyParser.json());

//using cors middleware
app.use(cors());

//mongoose connection to mongodb
const mongoose = require("mongoose");
mongoose
  .connect(
    "",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.log("DB connection unsuccessful!");
  });

//all setHeaders- middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PUT,PATCH,OPTIONS"
  );

  next();
});

//products
app.use("/api/product", ProductRoutes);
//Owner Login
app.use("/api/admin/login", AdminLoginRoute);
//category
app.use("/api/category", CategoryRoutes);
//user
app.use("/api/users", UserRoutes);

module.exports = app;
