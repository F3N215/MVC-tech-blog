const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// singup user ('/api/user)
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create(req.body);
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res
        .status(201)
        .json({ message: `Account created for ${dbUserData.username}` });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login user ('/api/user/login')
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: `User id ${req.params.id} is not valid.` });
      return;
    }
    // checks for pw
    const pwValidated = await dbUserData.checkPassword(req.body.password);
    if (!pwValidated) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    // create session and send response back
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      //send response to client
      res.status(200).json({ message: "You are logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logout user ('/api/user/logout')
router.post("/logout", withAuth, async (req, res) => {
  try {
    if (req.session.loggedIn) {
      await req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch {
    res.status(400).end();
  }
});

module.exports = router;
