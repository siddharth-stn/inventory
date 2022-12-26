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

// Display detail page for a specific item
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
        brands: results.brand,
        categories: results.categtory,
      });
    }
  );
};

// Handle item create on POST
exports.item_create_post = [
  // Validate and sanitize fields
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("brand", "Brand must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category").escape(),
  body("creation_date").escape(),

  // Process after request validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from the request
    const errors = validationResult(req);

    // Create an Item object with escaped and trimmed data
    const item = new Item({
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      creation_date: req.body.creation_date,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with the sanitized data
      // Get all brands and categories for form
      async.parallel(
        {
          brands(callback) {
            Brand.find().exec(callback);
          },
          categories(callback) {
            Category.find().exec(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }
          res.render("item_form", {
            title: "Create Item",
            brands: results.brands,
            categories: results.categories,
            item,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    // Data from the form is valid. Save Item
    item.save((err) => {
      if (err) {
        return next(errs);
      }
      // Successful: redirect to the new item page
      res.redirect(item.url);
    });
  },
];

// Display item delete form on GET
exports.item_delete_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
};

// Handle item delete on POST
exports.item_delete_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
};

// Display item update on GET
exports.item_update_get = (req, res, next) => {
  // Get item, brands and categories for form
  async.parallel(
    {
      item(callback) {
        Item.findById(req.params.id)
          .populate("brand")
          .populate("category")
          .exec(callback);
      },
      brands(callback) {
        Brand.find().exec(callback);
      },
      categories(callback) {
        Category.find().exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.item == null) {
        // No result
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }
      // Success
      res.render("item_form", {
        title: "Update Item",
        brands: results.brands,
        categories: results.categories,
        item: results.item,
      });
    }
  );
};

// Handle item update on POST
exports.item_update_post = [
  // Validate and sanitize fields
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process Request after validation and sanitization
  (req, res, next) => {
    // Extract validation errors from a request
    const errors = validatoionResult(req);

    // Create an Item object with the escaped and trimmed data and old id
    const item = new Item({
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      creation_date: req.body.creation_date,
      category: req.body.category,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. render form again with sanitized values

      // Get all brands and categories for form
      async.parallel(
        {
          brands(callback) {
            Brand.find().exec(callback);
          },
          categories(callback) {
            Category.find().exec(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }

          res.render("item_form", {
            title: "Update Item",
            brands: results.brands,
            categories: results.categories,
            item,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    // Data from the form is valid. Update the record
    Item.findByIdAndUpdate(req.params.id, item, {}, (err, theitem) => {
      if (err) {
        return next(err);
      }

      // Succesful: redirect to the item detail page
      res.redirect(theitem.url);
    });
  },
];
