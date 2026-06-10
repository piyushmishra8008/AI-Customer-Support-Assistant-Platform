const express = require("express");

const router =
  express.Router();

const protect =
  require(
    "../middleware/authMiddleware"
  );

const {
  getTickets,
  getTicketById,
  updateTicket,
} = require(
  "../controllers/ticketController"
);

router.get(
  "/",
  protect,
  getTickets
);

router.get(
  "/:id",
  protect,
  getTicketById
);

router.patch(
  "/:id",
  protect,
  updateTicket
);

module.exports = router;