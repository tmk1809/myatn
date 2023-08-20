var express = require("express");
const { MongoClient } = require("mongodb");
const ProductModel = require("../models/ProductModel");
var router = express.Router();

router.get("/allProduct", async (req, res) => {
  //1. connect to URL server
  var server = await MongoClient.connect(
    "mongodb+srv://khoi12345:Khoi12345@cluster0.gnewi.mongodb.net/"
  );
  //2. access to database
  var dbo = server.db("ATNToys");
  //get data
  var products = await dbo.collection("product").find().toArray();
  var firstProduct = await dbo.collection("product").find().limit(1);
  var secondHalf = await dbo.collection("product").find().skip(1).toArray();
  res.render("allProduct", { products: products });
});

router.post("/newProduct", async (req, res) => {
  var product = req.body;
  await ProductModel.create(product)
    .then(console.log("Add successfully !"))
    .catch((err) => console.log(err));
  res.redirect("/product/allProduct");
});

router.get("/insert", (req, res) => {
  res.render("newProduct");
});

router.get("/delete/:id", async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  res.redirect("/product/allProduct");
});

router.get("/edit/:id", async (req, res) => {
  var id = req.params.id;
  var product = await ProductModel.findById(id);
  res.render("product/editProduct", { product: product });
});

router.post("/edit/:id", async (req, res) => {
  await ProductModel.findByIdAndUpdate(req.params.id, req.body)
    .then(console.log("Edit successfully !"))
    .catch((err) => console.log(err));
  res.redirect("/product/allProduct");
});

module.exports = router;
