// import express router pkg to define routes for app
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

// router.get("/dashboard", (_, res) => {
//   res.render("dashboard", { title: "dashboard" });
// });

// router.get("/login", (_, res) => {
//   res.render("login", { title: "login" });
// });

// router.get("/signup", (_, res) => {
//   res.render("signup", { title: "signup" });
// });

// router.get("/post", (_, res) => {
//   res.render("post", { title: "post" });
// });

module.exports = router;
