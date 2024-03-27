const mongoose = require("mongoose");

//DB --> Document --> Collection

//creates collection in the DB
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//creates document in the DB
module.exports = mongoose.model("Category", categorySchema);
