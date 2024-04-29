// import dependencies
const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth"); // middleware
const sequelize = require("../config/connection"); // interacts with database

// route fetches all posts from logged-in user from the database, incl. comments and userinfo
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      userId: req.session.userId,
    },
    attributes: ["id", "title", "content", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "postId", "userId", "created_at"],
        // include: {
        //   model: User,
        //   attributes: ["username"],
        // },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      console.log("This is the dbPostData");
      console.log(dbPostData);
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // console.log(posts);
      res.render("dashboard", {
        posts,
        loggedIn: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get one post to edit ('dashboard/edit/:id')
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "postId", "userId", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "This id has no post." });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render("edit-post", {
        post,
        loggedIn: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//  Get new post ('/dashboard/new)
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", { username: req.session.username });
});

module.exports = router;
