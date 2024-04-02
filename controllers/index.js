// import express router pkg to define routes for app
const router = require("express").Router();
const User = require("../models");
const homeRoutes = require("./home-routes");
const apiRoutes = require("./api");

router.get("/", async (req, res) => {
  res.render("signup");
});

router.get("/api", apiRoutes);
router.get("/", homeRoutes);

module.exports = router;
