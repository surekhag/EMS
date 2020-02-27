const express = require("express");
const router = express.Router();
const selfReviewController = require("../app/api/controllers/self_review");

router.get("/", selfReviewController.getAll);
router.post("/add", selfReviewController.create);
router.put("/:id", selfReviewController.update);
router.delete("/:id", selfReviewController.delete);
module.exports = router;
