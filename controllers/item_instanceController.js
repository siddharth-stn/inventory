const Iteminstance = require("../models/item_instance");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

// Display list of all item instances
exports.iteminstance_list = (req, res, next) => {
  Iteminstance.find()
    .populate("item")
    .exec((err, list_iteminstances) => {
      if (err) {
        return next(err);
      }
      res.render("iteminstance_list", {
        title: "Item Instance List",
        iteminstance_list: list_iteminstances,
      });
    });
};

// Display detail page for a specific item instance
exports.iteminstance_detail = (req, res, next) => {
  Iteminstance.findById(req.params.id)
    .populate("item")
    .exec((err, itemInstance) => {
      if (err) {
        return next(err);
      }
      if (itemInstance == null) {
        const err = new Error("No Item of type in the Store");
        err.status = 404;
        return next(err);
      }
      res.render("iteminstance_detail", {
        title: `Product: ${itemInstance.item.title}`,
        iteminstance: itemInstance,
      });
    });
};

// Display Item Instance create form on GET
exports.iteminstance_create_get = (req, res, next) => {
  Item.find({}, "name").exec((err, items) => {
    if (err) {
      return next(err);
    }
    res.render("iteminstance_form", {
      title: "Create Item Instance",
      item_list: items,
    });
  });
};

// Handle Item Instance Create form on POST
exports.iteminstance_create_post = [
  // Validate and sanitize fields.
  body("item", "item must be specified").trim().isLength({ min: 1 }).escape(),
  body("status").escape(),
  body("date_of_manuf", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_exp", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create an ItemInstance object with escaped and trimmed data.
    const iteminstance = new Iteminstance({
      item: req.body.item,
      date_of_manuf: req.body.date_of_manuf,
      status: req.body.status,
      date_of_exp: req.body.date_of_exp,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages
      Item.find({}, "name").exec((err, items) => {
        if (err) {
          return next(err);
        }
        //Successful, so render
        res.render("iteminstance_form", {
          title: "Create Item Instance",
          item_list: items,
          selected_item: iteminstance.item._id,
          errors: errors.array(),
          iteminstance,
        });
      });
      return;
    }
    //Data from the form is valid.
    iteminstance.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to a new record.
      res.redirect(iteminstance.url);
    });
  },
];

// iteminstance delete display form on GET
exports.iteminstance_delete_get = (req, res, next) => {
  res.send("Not Implemented: Iteminstance delete form on GET");
};

// Handle iteminstance delete form on POST
exports.iteminstance_delete_post = (req, res, next) => {
  res.send("Not Implemented: iteminstance delete form on POST");
};

// Display ItemInstance update form on GET
exports.iteminstance_update_get = (req, res, next) => {
  res.send("Not Implemented: iteminstance update form on GET");
};

// Handle ItemInstance update form on POST
exports.iteminstance_update_post = (req, res, next) => {
  res.send("Not Implemented: iteminstance update form on POST");
};
