const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "SUPPORT_AGENT"],
      default: "ADMIN",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);