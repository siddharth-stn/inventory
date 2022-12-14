const express = require("express");
const router = express.Router();

// Initialize controller modules
const brand_controller = require("../controllers/brandController");
const category_controller = require("../controllers/categoryController");
const item_instance_controller = require("../controllers/item_instanceController");
const item_controller = require("../controllers/itemController");

/// ITEM ROUTES ///

/* GET article home page */
router.get("/", (req, res, next) => {
  res.send("Index Page");
});

// GET request for creating an item. Note this must come before the routes that displat Item using id.
router.get("/item/create", (req, res, next) => {
  res.send("Item Creation GET Page");
});

// POST request for creating an item.
router.post("/item/create", (req, res, next) => {
  res.send("Item Creation POST Page");
});

// GET request for deleting an item.
router.get("/item/:id/delete", (req, res, next) => {
  res.send("Item deletion GET Page");
});

// POST request for deleting an item.
router.post("/item/:id/delete", (req, res, next) => {
  res.send("Item deletion POST Page");
});

// GET request for updating an item.
router.get("/item/:id/update", (req, res, next) => {
  res.send("Item updation GET Page");
});

// POST request for updating an item.
router.post("/item/:id/update", (req, res, next) => {
  res.send("Item updation POST Page");
});

// GET request for one item.
router.get("/item/:id", (req, res, next) => {
  res.send("GET request to Show one item using its id");
});

/* GET request for list of all items */
router.get("/item", (req, res, next) => {
  res.send("Item List Page");
});

//! Have to start working here with brand routes

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
