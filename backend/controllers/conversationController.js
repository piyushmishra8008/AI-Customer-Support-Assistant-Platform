const Conversation = require(
  "../models/Conversation"
);

const Message = require(
  "../models/Message"
);

const getConversations =
  async (req, res) => {
    try {

      const conversations =
        await Conversation.find({
          businessId:
            req.user.businessId,
        }).sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        conversations,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

  const getConversationMessages =
  async (req, res) => {
    try {

      const conversation =
        await Conversation.findOne({
          _id: req.params.id,
          businessId:
            req.user.businessId,
        });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message:
            "Conversation not found",
        });
      }

      const messages =
        await Message.find({
          conversationId:
            conversation._id,
        }).sort({
          createdAt: 1,
        });

      res.json({
        success: true,
        messages,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

  const searchConversations =
  async (req, res) => {
    try {

      const { q } = req.query;

      const messages =
        await Message.find({
          content: {
            $regex: q,
            $options: "i",
          },
        });

      res.json({
        success: true,
        messages,
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
  getConversations,
  getConversationMessages,
  searchConversations,
};