const express = require("express");
const router = express.Router();
const userController = require("../app/api/controllers/users");

router.get("/", userController.getAll);
router.post("/register", userController.create);
router.post("/login", userController.authenticate);
router.post("/add", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
