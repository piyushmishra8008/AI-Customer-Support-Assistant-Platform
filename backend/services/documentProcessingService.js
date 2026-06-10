const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
console.log(pdfParse);
const extractText = async (
  filePath,
  fileType
) => {
  try {
    // PDF
    if (
      fileType.includes("pdf")
    ) {
      const dataBuffer =
        fs.readFileSync(filePath);

      const data =
        await pdfParse(dataBuffer);

      return data.text;
    }

    // DOCX
    if (
      fileType.includes(
        "officedocument"
      )
    ) {
      const result =
        await mammoth.extractRawText({
          path: filePath,
        });

      return result.value;
    }

    // TXT / MD
    return fs.readFileSync(
      filePath,
      "utf8"
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  extractText,
};