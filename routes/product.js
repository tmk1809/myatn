var express = require("express");
const { MongoClient } = require("mongodb");
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const ProductModel = require("../models/ProductModel");
var router = express.Router();

router.get("/allProduct", async (req, res) => {
  var server = await MongoClient.connect(
    "mongodb+srv://khoi12345:Khoi12345@cluster0.gnewi.mongodb.net/"
  );
  var dbo = server.db("ATNToys");
  var products = await dbo.collection("product").find().toArray();
  var firstProduct = await dbo.collection("product").find().limit(1);
  var secondHalf = await dbo.collection("product").find().skip(1).toArray();
  res.render("allProduct", { products: products });

});

router.post("/newProduct", async (req, res) => {
  // var product = req.body;
  // await ProductModel.create(product)
  //   .then(console.log("Add successfully !"))
  //   .catch((err) => console.log(err));
  // res.redirect("/product/allProduct");

  //1. connect to URL server
  let server = await MongoClient.connect("mongodb+srv://khoi12345:Khoi12345@cluster0.gnewi.mongodb.net/")
  //2. access to database
  let dbo = server.db("ATNToys")
  //3. insert product to database
  dbo.collection("product").insertOne(product)
  //4. return to home page
  res.redirect('/product/allProduct')
});

router.get("/insert", (req, res) => {
  res.render("newProduct");
});

router.get("/delete/:id", async (req, res) => {
  // await ProductModel.findByIdAndDelete(req.params.id);
  // res.redirect("/product/allProduct");

  let server = await MongoClient.connect("mongodb+srv://khoi12345:Khoi12345@cluster0.gnewi.mongodb.net/")
  //2. access to database
  let dbo = server.db("ATNToys")
  let products = await dbo.collection('product').find()
  let remove = await ProductModel.findByIdAndDelete(req.params.id)
  res.redirect("/product/allProduct");
});

router.get("/edit/:id", async (req, res) => {
  var id = req.params.id;
  var product = await ProductModel.findById(id);
  res.render("editProduct", { product: product });
});

router.post("/edit/:id", async (req, res) => {
  await ProductModel.findByIdAndUpdate(req.params.id, req.body)
    .then(console.log("Edit successfully !"))
    .catch((err) => console.log(err));
  res.redirect("/product/allProduct");
});

module.exports = router;
