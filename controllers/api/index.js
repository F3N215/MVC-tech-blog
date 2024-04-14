const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");

// all of these routes are prefixed with '/api'
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
