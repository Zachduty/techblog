const { Post, User, Comment } = require("../../models");
const { create } = require("../../models/Post");
const withAuth = require("../../utils/auth");
const router = require("express").Router();

router.get("/:id", async (req, res) => {
  console.log("THIS IS USER DATA", req.session);
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });
    const post = dbPostData.get({ plain: true });
    console.log(post);

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      raw: true,
    });

    if (commentData) {
      res.render("post", {
        post: post,
        comments: commentData,
        loggedIn: req.session.logged_in,
      });
    } else {
      res.render("post", { post: post, loggedIn: req.session.logged_in });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/create", async function (req, res) {
  console.log("TIme to save a new post!!", req.body);
  console.log("userrrrr", req.session);
  var newPost = {
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  }
  const created = await Post.create(newPost)
  res.json(created)


});

router.get('/dashboard/postupdate/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      }
    })

    const currentPost = postData.get({ plain: true });
    res.render('postupdate', { currentPost, loggedIn: req.session.logged_in })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;
