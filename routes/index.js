const express = require("express");
const verifyController = require("../controllers/verification");
const messageWebhookController = require("../controllers/messageWebhook");

const router = express.Router();

router.get("/", verifyController);
router.post("/", messageWebhookController);

module.exports = router;
