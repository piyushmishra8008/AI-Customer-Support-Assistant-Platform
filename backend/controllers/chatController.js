const Conversation = require(
  "../models/Conversation"
);
const Ticket = require("../models/Ticket");

const EscalationEvent = require(
  "../models/EscalationEvent"
);
const Message = require(
  "../models/Message"
);

const {
  getRelevantChunks,
} = require(
  "../services/chatService"
);

const {
  generateAnswer,
} = require(
  "../services/geminiService"
);

const {
  checkEscalation,
} = require(
  "../services/escalationService"
);

const askQuestion = async (req, res) => {
  try {

    const { question } = req.body;

    const chunks =
      await getRelevantChunks(
        req.user.businessId,
        question
      );

    const context = chunks
      .map(chunk => chunk.content)
      .join("\n");

    const answer =
      await generateAnswer(
        context,
        question
      );

    const conversation =
      await Conversation.create({
        businessId:
          req.user.businessId,
      });

    await Message.create({
      conversationId:
        conversation._id,
      sender: "USER",
      content: question,
    });

    await Message.create({
      conversationId:
        conversation._id,
      sender: "AI",
      content: answer,
    });

    const needsEscalation =
      checkEscalation(question);

    if (needsEscalation) {

      const ticket =
        await Ticket.create({
          businessId:
            req.user.businessId,

          conversationId:
            conversation._id,

          customerName:
            "Customer",

          query: question,

          priority: "HIGH",

          status: "OPEN",
        });

      await EscalationEvent.create({
        businessId:
          req.user.businessId,

        conversationId:
          conversation._id,

        ticketId:
          ticket._id,

        reason:
          "Escalation keyword detected",

        severity: "HIGH",
      });
    }

    res.json({
      success: true,
      answer,
      escalated:
        needsEscalation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};

module.exports = {
  askQuestion,
};