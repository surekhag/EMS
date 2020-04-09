const express = require("express");
const router = express.Router();
const sesClientController = require("../app/api/controllers/ses_client");

router.post("/", sesClientController.sendEmail);

module.exports = router;