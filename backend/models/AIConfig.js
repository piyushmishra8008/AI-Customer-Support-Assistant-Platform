const mongoose = require("mongoose");

const aiConfigSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      unique: true,
    },

    botName: {
      type: String,
      default: "SupportBot",
    },

    welcomeMessage: {
      type: String,
      default: "How can I help you today?",
    },

    personality: {
      type: String,
      enum: ["Professional", "Friendly", "Technical"],
      default: "Professional",
    },

    escalationKeywords: {
      type: [String],
      default: ["refund", "legal", "human"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIConfig", aiConfigSchema);