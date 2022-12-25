const express = require("express");
const router = express.Router();

// Initialize controller modules
const brand_controller = require("../controllers/brandController");
const category_controller = require("../controllers/categoryController");
const item_instance_controller = require("../controllers/item_instanceController");
const item_controller = require("../controllers/itemController");

//* ITEM ROUTES //

/* GET article home page */
router.get("/", item_controller.index);

// GET request for creating an item. Note this must come before the routes that displat Item using id.
router.get("/item/create", item_controller.item_create_get);

// POST request for creating an item.
router.post("/item/create", item_controller.item_create_post);

// GET request for deleting an item.
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST request for deleting an item.
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET request for updating an item.
router.get("/item/:id/update", item_controller.item_update_get);

// POST request for updating an item.
router.post("/item/:id/update", item_controller.item_update_post);

// GET request for one item.
router.get("/item/:id", item_controller.item_detail);

/* GET request for list of all items */
router.get("/item", item_controller.item_list);

//* BRAND ROUTES

// GET request for creating a brand. NOTE this must come before routes that use id (eg to display a brand).
router.get("/brand/create", brand_controller.brand_create_get);

// POST request for creating a brand.
router.post("/brand/create", brand_controller.brand_create_post);

// GET request to delete brand.
router.get("/brand/:id/delete", brand_controller.brand_delete_get);

// POST request to delete brand.
router.post("/brand/:id/delete", brand_controller.brand_delete_post);

// GET request to update brand.
router.get("/brand/:id/update", brand_controller.brand_update_get);

// POST request to update brand.
router.post("/brand/:id/update", brand_controller.brand_update_post);

// GET request to display one brand with id.
router.get("/brand/:id", brand_controller.brand_detail);

/* GET list for all brands */
router.get("/brand", brand_controller.brand_list);

//* CATEGORY Routes //

// GET request for creating a category. NOTE this route muct come before the routes using id (eg display a category)
router.get("/category/create", category_controller.category_create_get);

// POST route for creating a category.
router.post("/category/create", category_controller.category_create_post);

// GET route for deleting a category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST route for deleting a category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET route for update a category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST route for update a category.
router.post("/category/:id/update", category_controller.category_update_post);

// GET route to display a category using id.
router.get("/category/:id", category_controller.category_detail);

/* GET category list page */
router.get("/category", category_controller.category_list);

//* ITEM_INSTANCE Routes //

// GET request to create an item_instance. NOTE this must come before routes that use an id (eg delete or update using an id)
router.get(
  "/iteminstance/create",
  item_instance_controller.iteminstance_create_get
);

// POST request to create an item instance
router.post(
  "iteminstance/create",
  item_instance_controller.iteminstance_create_post
);

// GET request to delete an item instance using id
router.get(
  "iteminstance/:id/delete",
  item_instance_controller.iteminstance_delete_get
);

// POST request to delete an item instance using id
router.post(
  "iteminstance/:id/delete",
  item_instance_controller.iteminstance_delete_post
);

// GET request to update an item instance using id
router.get(
  "iteminstance/:id/update",
  item_instance_controller.iteminstance_update_get
);

// POST request to update an item instance using id
router.post(
  "iteminstance/:id/update",
  item_instance_controller.iteminstance_update_post
);

// GET request to display an item instance using id
router.get("iteminstance/:id", item_instance_controller.iteminstance_detail);

/* GET iteminstance list page */
router.get("/iteminstance", item_instance_controller.iteminstance_list);

module.exports = router;
