const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/new/:id").post(userController.createEmployee);

router.route("/update/:id").put(userController.updateEmployee);

router.route("/delete/:id").delete(userController.deleteEmployee);

module.exports = router;