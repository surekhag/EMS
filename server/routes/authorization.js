const express = require("express");
const router = express.Router();
const authController = require("../app/api/controllers/authorization");

router.get("/", authController.getAuth);

module.exports = router;
