const express = require("express");
const router = express.Router();
const userController = require("../app/api/controllers/users");

router.get("/", userController.getAll);
router.post("/register", userController.create);
router.post("/login", userController.authenticate);
router.post("/add", userController.create);
router.put("/:userName", userController.update);
router.delete("/:userName", userController.delete);

module.exports = router;
