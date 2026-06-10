const Conversation = require(
  "../models/Conversation"
);

const Ticket = require(
  "../models/Ticket"
);

const EscalationEvent = require(
  "../models/EscalationEvent"
);
const getDashboardAnalytics =
  async (req, res) => {
    try {

      const businessId =
        req.user.businessId;

      const totalConversations =
        await Conversation.countDocuments({
          businessId,
        });

      const openTickets =
        await Ticket.countDocuments({
          businessId,
          status: "OPEN",
        });

      const resolvedTickets =
        await Ticket.countDocuments({
          businessId,
          status: "RESOLVED",
        });

      const escalatedTickets =
        await EscalationEvent.countDocuments({
          businessId,
        });

      const aiResolved =
        totalConversations -
        escalatedTickets;

      const aiResolutionRate =
        totalConversations === 0
          ? 0
          : (
              (aiResolved /
                totalConversations) *
              100
            ).toFixed(2);

      res.json({
        success: true,

        analytics: {
          totalConversations,
          openTickets,
          resolvedTickets,
          escalatedTickets,
          aiResolutionRate,
        },
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
  getDashboardAnalytics,
};