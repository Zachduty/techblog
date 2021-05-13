const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    Post.findAll({raw: true,
      include: [
        {
          model: User,
          attributes: [
            'id',
            'name',
            'email'
          ]
        }
      ]
    }).then(function(postData) {
      console.log(postData)
      res.render('home', {posts: postData});      
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/api/user/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
