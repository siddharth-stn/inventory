const async = require("async");
const Brand = require("../models/brand");
const Item = require("../models/item");

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

//! Have to start working here with brand create form on GET.
