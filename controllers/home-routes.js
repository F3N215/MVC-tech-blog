const router = require("express").Router();
const { Post, User, Comment } = require("../mdoels");
const sequelize = require("../congi/connection");

// uses GET method to retrieve all posts
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      // posts are pulled from db
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "postId", "userId", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    // serializes data once retrieved from db
    const post = dbPostData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// uses GET method to retrieve a single post ('/post/:id')
router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "content", "title", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "postId", "userId", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (dbPostData) {
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    } else {
      res.status(404).json({ message: "This id has no post." });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Signup
router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;
