const router = require("express").Router();
const googleRoutes = require("./signin");
const userRoutes = require("./user");
const ngoRoutes = require("./ngo");

router.use("/google", googleRoutes);
router.use("/user", userRoutes);
router.use("/ngo", ngoRoutes);

module.exports = router;