const DocumentChunk = require(
  "../models/DocumentChunk"
);

const getRelevantChunks =
  async (businessId, question) => {

    const chunks =
      await DocumentChunk.find({
        businessId,
      }).limit(5);

    return chunks;
};

module.exports = {
  getRelevantChunks,
};