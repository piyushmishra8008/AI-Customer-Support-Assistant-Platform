const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    name: String,

    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);