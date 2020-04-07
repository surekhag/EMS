const express = require("express");
const router = express.Router();
const projectAllocationController = require("../app/api/controllers/project_allocation");

//Project allocation for all project
router.get("/", projectAllocationController.getAll); 

//Project allocation for single project
router.get("/:id", projectAllocationController.getProjectAllocations); 

router.post("/add", projectAllocationController.create);
router.put("/:id", projectAllocationController.update);
router.delete("/:id", projectAllocationController.delete);
module.exports = router;
