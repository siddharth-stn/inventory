const mongoose = require("mongoose");

// Get class Schema from mongoose
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  brand_name: { type: String, required: true },
  gst_number: { type: String },
  address: { type: String },
});

BrandSchema.virtual("url").get(function () {
  return `/article/brand/${this._id}`;
});

module.exports = mongoose.model("Brand", BrandSchema);
