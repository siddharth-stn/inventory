const async = require("async");
const Brand = require("../models/brand");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

// Display list of all Brands
exports.brand_list = (req, res, next) => {
  Brand.find()
    .sort({ brand_name: 1 })
    .exec((err, list_brand) => {
      if (err) {
        return next(err);
      }
      res.render("brand_list", {
        title: "Brand List",
        brand_list: list_brand,
      });
    });
};

// Display detail page for a specific brand
exports.brand_detail = (req, res, next) => {
  async.parallel(
    {
      brand: (callback) => {
        Brand.findById(req.params.id).exec(callback);
      },
      brands_items: (callback) => {
        Item.find({ brand: req.params.id }, "name description").exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.brand == null) {
        const err = new Error("Brand not found in database");
        err.status = 404;
        return next(err);
      }
      res.render("brand_detail", {
        title: "brand Detail",
        brand: results.brand,
        brand_items: results.brand_items,
      });
    }
  );
};

// Display Brand Create form on GET
exports.brand_create_get = (req, res, next) => {
  res.render("brand_form", { title: "Create Brand" });
};

// Handle Brand Create on POST
exports.brand_create_post = [
  body("brand_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand name must be specified")
    .isAlphanumeric()
    .withMessage("Brand name has non-alphanumeric characters"),
  body("gst_number")
    .trim()
    .isLength({ min: 1, max: 14 })
    .escape()
    .withMessage("Gst Number must be specified")
    .isAlphanumeric()
    .withMessage("Gst Number must be alphanumeric"),
  body("address")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Firm Address Must be Specified"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Create Brand",
        brand: req.body,
        errors: errors.array(),
      });
      return;
    }

    const brand = new Brand({
      brand_name: req.body.brand_name,
      gst_number: req.body.gst_number,
      address: req.body.address,
    });

    brand.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(brand.url);
    });
  },
];

// Display Brand Delete form on get
exports.brand_delete_get = (req, res, next) => {
  async.parallel(
    {
      brand: (callback) => {
        Brand.findById(req.params.id).exec(callback);
      },
      brand_items: (callback) => {
        Item.find({ Brand: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.brand == null) {
        res.redirect("/article/brands");
      }
      res.render("brand_delete", {
        title: "Delete Brand",
        brand: results.brand,
        brand_items: results.brand_items,
      });
    }
  );
};

// Handle Brand delelte on POST
exports.brand_delete_post = (req, res, next) => {
  async.parallel(
    {
      brand: (callback) => {
        Brand.findById(req.body.brandid).exec(callback);
      },
      brand_items: (callback) => {
        Item.find({ brand: req.body.brandid }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.brand_items.length > 0) {
        // Brand has Items. Render in same way as for GET route.
        res.render("brand_delete", {
          title: "Delete Brand",
          brand: results.brand,
          brand_items: results.brand_items,
        });
        return;
      }
      // Brand has no items. Delete object from the database and redirect to the list of Brands.
      Brand.findByIdAndRemove(req.body.brandid, (err) => {
        if (err) {
          return next(err);
        }
        // Success - go to Brand list
        res.redirect("/article/brand");
      });
    }
  );
};

// Display Brand Update form in GET.
exports.brand_update_get = (req, res, next) => {
  res.send("NOT Implemented: Brand update GET");
};

// Handle Brand update on POST.
exports.brand_update_post = (req, res, next) => {
  res.send("NOT Implemented: Brand update POST");
};
