const express = require("express");
const router = express.Router();
const projectAllocationController = require("../app/api/controllers/project_allocation");

//Project allocation for all project
router.get("/", projectAllocationController.getAll);
router.post("/add", projectAllocationController.create);
router.put("/:id", projectAllocationController.update);
router.delete("/:id", projectAllocationController.delete);
module.exports = router;
