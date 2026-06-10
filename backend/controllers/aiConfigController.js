const AIConfig = require("../models/AIConfig");

const getConfig = async (req, res) => {
  try {
    const config = await AIConfig.findOne({
      businessId: req.user.businessId,
    });

    if (!config) {
      return res.status(404).json({
        success: false,
        message: "Config not found",
      });
    }

    res.status(200).json({
      success: true,
      config,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateConfig = async (req, res) => {
  try {
    const {
      botName,
      welcomeMessage,
      personality,
      escalationKeywords,
    } = req.body;

    let config = await AIConfig.findOne({
      businessId: req.user.businessId,
    });

    if (!config) {
      config = await AIConfig.create({
        businessId: req.user.businessId,
        botName,
        welcomeMessage,
        personality,
        escalationKeywords,
      });
    } else {
      config.botName =
        botName || config.botName;

      config.welcomeMessage =
        welcomeMessage ||
        config.welcomeMessage;

      config.personality =
        personality ||
        config.personality;

      config.escalationKeywords =
        escalationKeywords ||
        config.escalationKeywords;

      await config.save();
    }

    res.status(200).json({
      success: true,
      config,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getConfig,
  updateConfig,
};