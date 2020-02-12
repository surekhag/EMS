const express = require("express");
const router = express.Router();
const projectController = require("../app/api/controllers/projects");

router.get("/", projectController.getAll);
router.post("/add", projectController.create);
router.get("/:id", projectController.getProject);
router.put("/:id", projectController.update);
router.delete("/:id", projectController.delete);
module.exports = router;
