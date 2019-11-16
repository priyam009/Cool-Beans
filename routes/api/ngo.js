const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/new/:id").post(userController.createNGO);

router.route("/").get(userController.getAllNGO);

module.exports = router;

