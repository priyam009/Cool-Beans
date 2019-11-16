const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/new/:id").post(userController.createEmployee);

module.exports = router;