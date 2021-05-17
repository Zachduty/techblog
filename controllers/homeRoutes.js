const router = require('express').Router();
const session = require('express-session');
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
      console.log('THIS IS POSTDATA', postData)
      res.render('home', {posts: postData, loggedIn: req.session.logged_in});      
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async(req, res) => {

  const postData = await Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: {
      model: User, 
      attributes: [
        'id',
        'name',
        'email'
      ]
    }
  })

  const posts = postData.map((post) => post.get({ plain: true }))
  console.log(posts);

  
  res.render('dashboard', {
    loggedIn: req.session.logged_in,
    posts,
  })

})


router.get('/login', (req, res) => {
  res.render('login');
})

router.get("/api/user/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
