const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  description: { type: String, required: true },
  creation_date: { type: Date, required: true, default: new Date() },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

// Virtual for item URL
ItemSchema.virtual("url").get(function () {
  return `/article/item/${this._id}`;
});

ItemSchema.virtual("prod_code", function () {
  const date = DateTime.fromJSDate(this.creation_date).toLocaleString(
    DateTime.DATE_MED
  );
  return `${date}\\${this._id}`;
});

// Create & Export Model
module.exports = mongoose.model("Item", ItemSchema);
