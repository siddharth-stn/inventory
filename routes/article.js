const express = require("express");
const router = express.Router();

// Initialize controller modules
const brand_controller = require("../controllers/brandController");
const category_controller = require("../controllers/categoryController");
const item_instance_controller = require("../controllers/item_instanceController");
const item_controller = require("../controllers/itemController");

/* GET index page */
router.get("/", (req, res, next) => {
  res.send("Index Page");
});

/* GET item list page */
router.get("/item", (req, res, next) => {
  res.send("Item List Page");
});

/* GET iteminstance list page */
router.get("/iteminstance", (req, res, next) => {
  res.send("Item Instance List Page");
});

/* GET Brand list page */
router.get("/brand", (req, res, next) => {
  res.send("Brand List Page");
});

/* GET category list page */
router.get("/category", (req, res, next) => {
  res.send("Category List Page");
});

module.exports = router;
