const router = require("express").Router();

const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard-routes");
const commentRoutes = require("./comment-routes");

// all of these routes are prefixed with '/api'
router.use("/", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
