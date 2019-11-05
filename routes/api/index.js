const router = require("express").Router();
const googleRoutes = require("./signin");

router.use("/google", googleRoutes);

module.exports = router;