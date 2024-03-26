const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// uses GET method to retrieve comments ('api/comment')
router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({});
    if (dbCommentData.length === 0) {
      res.status(404).json({ message: "You have no comment." });
      return;
    }
    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// uses GET method to retrieve comments from 1 post
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: { id: req.params.id },
    });
    if (commentData.length === 0) {
      res
        .status(404)
        .json({ message: `The id ${req.params.id} has no comment.` });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
