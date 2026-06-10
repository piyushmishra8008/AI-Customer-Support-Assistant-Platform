const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAnswer = async (
  context,
  question
) => {

  const prompt = `
You are a customer support assistant.

Knowledge Base:
${context}

Question:
${question}

Answer only using the provided knowledge base.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return response.text;
};

module.exports = {
  generateAnswer,
};