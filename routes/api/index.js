const router = require("express").Router();
const googleRoutes = require("./signin");
const userRoutes = require("./user");
const ngoRoutes = require("./ngo");
const employeeRoutes = require("./employee");

router.use("/google", googleRoutes);
router.use("/user", userRoutes);
router.use("/ngo", ngoRoutes);
router.use("/employee", employeeRoutes);

module.exports = router;