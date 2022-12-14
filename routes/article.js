const express = require("express");
const router = express.Router();

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
