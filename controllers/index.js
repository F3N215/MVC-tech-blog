// import express router pkg to define routes for app
const router = require("express").Router();
const User = require("../models");

router.get("/", async (req, res) => {
  res.render("signup");
});

module.exports = router;
