const express = require("express");
const router = express.Router();
const leavesCreditSummaryController = require("../app/api/controllers/leaves_credit_summary");

// router.get("/", leavesCreditSummaryController.getAll);
router.post("/add", leavesCreditSummaryController.create);
// router.put("/:id", leavesCreditSummaryController.update);
// router.delete("/:id", leavesCreditSummaryController.delete);
module.exports = router;
