const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getConfig,
  updateConfig,
} = require(
  "../controllers/aiConfigController"
);

router.get("/", protect, getConfig);

router.put("/", protect, updateConfig);

module.exports = router;