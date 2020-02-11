const express = require("express");
const router = express.Router();
const projectController = require("../app/api/controllers/projects");

router.get("/", projectController.getAll);
router.post("/add", projectController.create);
router.get("/:title", projectController.getProject);
router.put("/:title", projectController.update);
router.delete("/:title", projectController.delete);
module.exports = router;
