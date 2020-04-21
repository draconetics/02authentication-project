const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const { userService } = require("./dependency");

const userController = new UserController(userService);

router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.post("/users", (req, res) => userController.register(req, res));
router.get("/users/:id", (req, res) => userController.getUser(req, res));
router.post("/users/login", (req, res) => userController.login(req, res));


module.exports = router;
