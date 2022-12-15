const express = require("express");
const router = express.Router();

// Initialize controller modules
const brand_controller = require("../controllers/brandController");
const category_controller = require("../controllers/categoryController");
const item_instance_controller = require("../controllers/item_instanceController");
const item_controller = require("../controllers/itemController");

//* ITEM ROUTES //

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

//* BRAND ROUTES

// GET request for creating a brand. NOTE this must come before routes that use id (eg to display a brand).
router.get("/brand/create", (req, res, next) => {
  res.send("GET page for brand creation");
});

// POST request for creating a brand.
router.post("/brand/create", (req, res, next) => {
  res.send("POST page to create brand");
});

// GET request to delete brand.
router.get("/brand/:id/delete", (req, res, next) => {
  res.send("GET page to delete brand");
});

// POST request to delete brand.
router.post("/brand/:id/delete", (req, res, next) => {
  res.send("POST page to delete brand");
});

// GET request to update brand.
router.get("/brand/:id/update", (req, res, next) => {
  res.send("GET page to update brand");
});

// POST request to update brand.
router.post("/brand/:id/update", (req, res, next) => {
  res.send("POST page to update brand");
});

// GET request to display one brand with id.
router.get("/brand/:id", (req, res, next) => {
  res.send("GET page to to diplay brand");
});

/* GET list for all brands */
router.get("/brand", (req, res, next) => {
  res.send("Brand List Page");
});

//* CATEGORY Routes //

// GET request for creating a category. NOTE this route muct come before the routes using id (eg display a category)
router.get("/category/create", (req, res, next) => {
  res.send("GET request for creating a category");
});

// POST route for creating a category.
router.post("/category/create", (req, res, next) => {
  res.send("POST request for creating a category");
});

// GET route for deleting a category.
router.get("/category/:id/delete", (req, res, next) => {
  res.send("GET request for deleting a category");
});

// POST route for deleting a category.
router.post("/category/:id/delete", (req, res, next) => {
  res.send("POST request for deleting a category");
});

// GET route for update a category.
router.get("/category/:id/update", (req, res, next) => {
  res.send("GET request for updating a category");
});

// POST route for update a category.
router.post("/category/:id/update", (req, res, next) => {
  res.send("POST request for updating a category");
});

// GET route to display a category using id.
router.get("/category/:id", (req, res, next) => {
  res.send("GET request to display a category");
});

/* GET category list page */
router.get("/category", (req, res, next) => {
  res.send("Category List Page");
});

//* ITEM_INSTANCE Routes //

// GET request to create an item_instance. NOTE this must come before routes that use an id (eg delete or update using an id)
router.get("/iteminstance/create", (req, res, next) => {
  res.send("Create an item instance");
});

// POST request to create an item instance
router.post("iteminstance/create", (req, res, next) => {
  res.send("POST route to create an item instance");
});

// GET request to delete an item instance using id
router.get("iteminstance/:id/delete", (req, res, next) => {
  res.send("GET route to delete an item instance");
});

// POST request to delete an item instance using id
router.post("iteminstance/:id/delete", (req, res, next) => {
  res.send("POST route to delete an item instance");
});

// GET request to update an item instance using id
router.get("iteminstance/:id/update", (req, res, next) => {
  res.send("GET route to update an item instance");
});

// POST request to update an item instance using id
router.post("iteminstance/:id/update", (req, res, next) => {
  res.send("POST route to update an item instance");
});

// GET request to display an item instance using id
router.get("iteminstance/:id", (req, res, next) => {
  res.send("GET route to display an item instance");
});

/* GET iteminstance list page */
router.get("/iteminstance", (req, res, next) => {
  res.send("Item Instance List Page");
});

module.exports = router;
