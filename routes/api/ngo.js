const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/new").post(userController.createNGO);

module.exports = router;

