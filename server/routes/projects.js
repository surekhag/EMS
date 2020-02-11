const express = require("express");
const router = express.Router();
const projectController = require("../app/api/controllers/projects");

router.get("/", projectController.getAll);
router.post("/add", projectController.create);
router.get("/:_id", projectController.getProject);
router.put("/:_id", projectController.update);
router.delete("/:_id", projectController.delete);
module.exports = router;
