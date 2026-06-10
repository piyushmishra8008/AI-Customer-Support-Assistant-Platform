const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      unique: true,
    },

    totalConversations: {
      type: Number,
      default: 0,
    },

    totalTickets: {
      type: Number,
      default: 0,
    },

    resolvedTickets: {
      type: Number,
      default: 0,
    },

    escalatedTickets: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", analyticsSchema);