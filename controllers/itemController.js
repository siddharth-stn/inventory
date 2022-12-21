const Item = require("../models/item");
const Brand = require("../models/brand");
const Category = require("../models/category");
const Iteminstance = require("../models/item_instance");

const async = require("async");

const { body, validationResult } = require("express-validator");

// Display count of all articles
exports.index = (req, res, next) => {
  async.parallel(
    {
      item_count(callback) {
        Item.countDocuments({}, callback);
      },

      item_instance_count(callback) {
        Iteminstance.countDocuments({}, callback);
      },
      item_instance_available_count(callback) {
        Iteminstance.countDocuments({ status: "Available" }, callback);
      },
      brand_count(callback) {
        Brand.countDocuments({}, callback);
      },
      category_count(callback) {
        Category.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Inventory Management Home",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all items
exports.item_list = (req, res, next) => {
  Item.find({}, "name brand")
    .sort({ title: 1 })
    .populate("brand")
    .exec((err, list_items) => {
      if (err) {
        return next(err);
      }
      res.render("item_list", {
        title: "Item List",
        item_list: list_items,
      });
    });
};

// Display detail page for a specific book
exports.item_detail = (req, res, next) => {
  async.parallel(
    {
      item(callback) {
        Item.findById(req.params.id)
          .populate("brand")
          .populate("category")
          .exec(callback);
      },

      item_instance(callback) {
        Iteminstance.find({ item: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.item == null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }
      res.render("item_detail", {
        title: results.item.name,
        item: results.item,
        item_instances: results.item_instance,
      });
    }
  );
};

// Display item create form on GET
exports.item_create_get = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.find().exec(callback);
      },
      category(callback) {
        Category.find().exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("item_form", {
        title: "Create Item",
        brand: results.brand,
        category: results.categtory,
      });
    }
  );
};

// Handle item create on POST
exports.item_create_post = [
  // Validate and sanitize fields
  body("name"),
  //! have to start working here
];
