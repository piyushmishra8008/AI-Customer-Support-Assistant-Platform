const mongoose = require("mongoose");

const documentChunkSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    embedding: {
   type: [Number],
   default: []
},
    chunkIndex: Number
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("DocumentChunk", documentChunkSchema);