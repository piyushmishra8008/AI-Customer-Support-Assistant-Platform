const Document = require("../models/Document");
const fs = require("fs");
const {
  extractText,
} = require("../services/documentProcessingService");

const {
  chunkText,
} = require("../services/chunkService");

const {
  generateEmbedding,
} = require(
  "../services/embeddingService"
);
const DocumentChunk = require("../models/DocumentChunk");

const uploadDocument = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const document =
      await Document.create({
        businessId:
          req.user.businessId,

        fileName: req.file.filename,

        originalName:
          req.file.originalname,

        fileType: req.file.mimetype,

        fileSize: req.file.size,

        storagePath: req.file.path,

        status: "UPLOADING",
      });
      const extractedText = await extractText(
  req.file.path,
  req.file.mimetype
);
const chunks = chunkText(extractedText);
// 4. Save chunks
   for(let i = 0; i < chunks.length; i++) {

  const embedding =
    await generateEmbedding(
      chunks[i]
    );

  await DocumentChunk.create({
     businessId: req.user.businessId,
     documentId: document._id,
     content: chunks[i],
     chunkIndex: i,
     embedding
  });

}

    // 5. Update status
    document.status = "PROCESSED";
    await document.save();

    res.status(201).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDocuments = async (
  req,
  res
) => {
  try {
    const documents =
      await Document.find({
        businessId:
          req.user.businessId,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteDocument = async (
  req,
  res
) => {
  try {
    const document =
      await Document.findById(
        req.params.id
      );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    fs.unlinkSync(
      document.storagePath
    );

    await document.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  deleteDocument,
};