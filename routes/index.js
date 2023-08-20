var express = require("express");
const ProductModel = require("../models/ProductModel");
var router = express.Router();

router.get("/", async (req, res) => {
  res.render("index");
});

module.exports = router;
