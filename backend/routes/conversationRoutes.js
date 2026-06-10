const express =
  require("express");

const router =
  express.Router();

const protect =
  require(
    "../middleware/authMiddleware"
  );

const {
  getConversations,
  getConversationMessages,
  searchConversations,
} = require(
  "../controllers/conversationController"
);

router.get(
  "/",
  protect,
  getConversations
);

router.get(
  "/search",
  protect,
  searchConversations
);

router.get(
  "/:id/messages",
  protect,
  getConversationMessages
);

module.exports = router;