const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    fileName: String,

    originalName: String,

    fileType: String,

    fileSize: Number,

    storagePath: String,

    status: {
      type: String,
      enum: ["UPLOADING", "PROCESSING", "PROCESSED", "FAILED"],
      default: "PROCESSING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);