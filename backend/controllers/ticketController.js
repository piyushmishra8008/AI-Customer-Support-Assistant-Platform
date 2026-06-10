const Ticket = require("../models/Ticket");

const getTickets = async (
  req,
  res
) => {
  try {

    const tickets =
      await Ticket.find({
        businessId:
          req.user.businessId,
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      tickets,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};

const getTicketById = async (
  req,
  res
) => {
  try {

    const ticket =
      await Ticket.findOne({
        _id: req.params.id,
        businessId:
          req.user.businessId,
      });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message:
          "Ticket not found",
      });
    }

    res.json({
      success: true,
      ticket,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};

const updateTicket = async (
  req,
  res
) => {
  try {

    const { status } =
      req.body;

    const ticket =
      await Ticket.findOne({
        _id: req.params.id,
        businessId:
          req.user.businessId,
      });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message:
          "Ticket not found",
      });
    }

    ticket.status = status;

    await ticket.save();

    res.json({
      success: true,
      ticket,
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
  getTickets,
  getTicketById,
  updateTicket,
};