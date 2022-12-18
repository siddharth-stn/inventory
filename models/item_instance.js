const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IteminstanceSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  date_of_manuf: { type: Date, default: Date.now, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Out of Stock"],
    default: "Out of Stock",
  },
  date_of_exp: { type: Date, default: Date.now, required: true },
});

IteminstanceSchema.virtual("url").get(function () {
  return `/article/iteminstance/${this._id}`;
});

IteminstanceSchema.virtual("isExp").get(function () {
  let currFullDate = new Date();
  let currYear = currFullDate.getFullYear();
  let currMonth = currFullDate.getMonth();
  let currDate = currFullDate.getDate();

  let yearOfExp = this.date_of_exp.getFullYear();
  let monthOfExp = this.date_of_exp.getMonth();
  let dateOfExp = this.date_of_exp.getDate();

  if (
    yearOfExp >= currYear &&
    monthOfExp >= currMonth &&
    dateOfExp >= currDate
  ) {
    return false;
  } else {
    return true;
  }
});

module.exports = mongoose.model("Iteminstance", IteminstanceSchema);
