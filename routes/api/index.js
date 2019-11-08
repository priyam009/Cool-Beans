const router = require("express").Router();
const googleRoutes = require("./signin");
const userRoutes = require("./user");

router.use("/google", googleRoutes);
router.use("/user", userRoutes);

module.exports = router;