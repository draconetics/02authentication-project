const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const { userService } = require("./dependency");
const auth = require('../middleware/auth.mid')

const userController = new UserController(userService);

router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.post("/users", (req, res) => userController.register(req, res));
router.post("/users/login", (req, res) => userController.login(req, res));
router.post("/users/logout", auth,(req, res) => userController.logout(req, res));
router.get("/users/profile", auth,(req, res) => userController.getUserProfile(req, res));
router.get("/users/hello", auth, (req, res) => res.status(200).send({msg:"hello"}));
router.get("/users/id/:id", auth, (req, res) => userController.getUser(req, res)); 



module.exports = router;
