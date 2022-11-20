#! /usr/bin/env node

console.log(
  "This script populates some test items, brands, categories and iteminstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

var async = require("async");
var Item = require("./models/item");
var Brand = require("./models/brand");
var Category = require("./models/category");
var ItemInstance = require("./models/item_instance");

var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://m001-student:mongodb-basics@sandbox.ed9rkru.mongodb.net/inventory?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var brands = [];
var categories = [];
var items = [];
var iteminstances = [];

function brandCreate(brand_name, gst_number, address, cb) {
  var branddetail = {
    brand_name: brand_name,
    gst_number: gst_number,
    address: address,
  };

  var brand = new Brand(branddetail);

  brand.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Brand: " + brand);
    brands.push(brand);
    cb(null, brand);
  });
}

function categoryCreate(name, cb) {
  var category = new Category({ name: name });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, brand, description, creation_date, category, cb) {
  var itemdetail = {
    name: name,
    brand: brand,
    description: description,
    creation_date: creation_date,
    category: category,
  };

  var item = new Item(itemdetail);
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function itemInstanceCreate(item, date_of_manuf, status, date_of_exp, cb) {
  var iteminstancedetail = {
    item: item,
    date_of_manuf: date_of_manuf,
    status: status,
    date_of_exp: date_of_exp,
  };

  var iteminstance = new ItemInstance(iteminstancedetail);
  iteminstance.save(function (err) {
    if (err) {
      console.log("ERROR CREATING ItemInstance: " + iteminstance);
      cb(err, null);
      return;
    }
    console.log("New ItemInstance: " + iteminstance);
    iteminstances.push(iteminstance);
    cb(null, iteminstance);
  });
}

function createBrandCategories(cb) {
  async.series(
    [
      function (callback) {
        brandCreate(
          "Nestle",
          "1234SUVARNA",
          "Abad Gali Barbad Mohalla",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Saffola",
          "1234PAGLANA",
          "Suddi Baba Tunda Gali",
          callback
        );
      },
      function (callback) {
        brandCreate("Brittania", "5434TIMNA", "Sulli Bhai Ka Ghar", callback);
      },
      function (callback) {
        brandCreate(
          "Patanjali",
          "555BOND",
          "Khad Godam Ke Peeche Peepal Ke Neeche",
          callback
        );
      },

      function (callback) {
        categoryCreate("Instant Foods", callback);
      },
      function (callback) {
        categoryCreate("Biscuits", callback);
      },
      function (callback) {
        categoryCreate("Oils", callback);
      },
      function (callback) {
        categoryCreate("Ayurvedic Medicines", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Maggi",
          brands[0],
          "Pani mein ubalo aur plate mein nikal ke khalo",
          new Date("2022-11-20"),
          categories[0],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Hide and Seek",
          brands[1],
          "Packet kholo aur pet bharo",
          new Date("2022-11-20"),
          categories[1],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Sarson Tel",
          brands[2],
          "Poori banao parantha banao aur mast khao",
          new Date("2022-11-20"),
          categories[2],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Kesh Kanti",
          brands[3],
          "Baal ko iss shampoo se dho lo",
          new Date("2022-11-20"),
          categories[3],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createItemInstances(cb) {
  async.parallel(
    [
      function (callback) {
        itemInstanceCreate(
          items[0],
          new Date("2019-11-20"),
          "Available",
          new Date("2023-11-20"),
          callback
        );
      },
      function (callback) {
        itemInstanceCreate(
          items[1],
          new Date("2019-11-20"),
          "Out of Stock",
          new Date("2021-11-20"),
          callback
        );
      },
      function (callback) {
        itemInstanceCreate(
          items[2],
          new Date("2019-11-20"),
          "Available",
          new Date("2022-10-20"),
          callback
        );
      },
      function (callback) {
        itemInstanceCreate(
          items[3],
          new Date("2019-11-20"),
          "Available",
          new Date("2023-11-20"),
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createBrandCategories, createItems, createItemInstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("ITEMInstances: " + iteminstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
