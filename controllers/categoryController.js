const Category = require("../models/category");
const Item = require("../models/item");
const async = require("async");
const { body, validationResult } = require("express-validator");
const { getMaxListeners } = require("../models/category");

// Display list of all categories
exports.category_list = (req, res, next) => {
  Category.find()
    .sort({ name: 1 })
    .exec((err, list_category) => {
      if (err) {
        return next(err);
      }
      res.render("category list", {
        title: "Category List",
        category_list: list_category,
      });
    });
};

// Display detail page for a specific category.
exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      category: (callback) => {
        Category.findById(req.params.id).exec(callback);
      },
      category_items: (callback) => {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }
      res.render("category_detail", {
        title: "Category Detail",
        category: results.category,
        category_items: results.category_items,
      });
    }
  );
};

// Display Category create form on GET.
exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
};

// Handle create category form on POST.
exports.category_create_post = [
  // Validate and sanitize the name field
  body("name", "Category name required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a category object in the database with the escaped and trimmed data
    const category = new Category({ name: req.body.name });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("category_form", {
        title: "Create Category",
        category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data form is valid
      // Check if Category with same name already exists in the database.
      Category.findOne({ name: req.body.name }).exec((err, found_category) => {
        if (err) {
          return next(err);
        }
        if (found_category) {
          // Category exists, redirect to its detail page.
          res.redirect(found_category.url);
        } else {
          category.save((err) => {
            if (err) {
              return next(err);
            }
            // Category saved. Redirect to the Category detail page
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

//! Start working here with category delete form on GET.
