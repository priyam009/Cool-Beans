const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/new/:id").post(userController.createNGO);

router.route("/").get(userController.getAllNGO);

router.route("/update/:id").put(userController.updateNGO);

router.route("/delete/:id").delete(userController.deleteNGO);

module.exports = router;

