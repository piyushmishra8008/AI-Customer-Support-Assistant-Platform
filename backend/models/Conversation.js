const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "ESCALATED", "CLOSED"],
      default: "ACTIVE",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);