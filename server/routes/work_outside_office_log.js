const express = require("express");
const router = express.Router();
const workOutsideOfficeLogController = require("../app/api/controllers/work_outside_office_log");

// router.get("/", workOutsideOfficeLogController.getAll);
router.post("/add", workOutsideOfficeLogController.create);
// router.put("/:id", workOutsideOfficeLogController.update);
// router.delete("/:id", workOutsideOfficeLogController.delete);
module.exports = router;
