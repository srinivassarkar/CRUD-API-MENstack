const mongoose = require("mongoose");

//DB --> Document --> Collection

//creates collection in the DB
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required : true
    },
  },
  { timestamps: true }
);
//creates document in the DB
module.exports = mongoose.model("Product", productSchema);
