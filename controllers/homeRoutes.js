const router = require('express').Router();
const session = require('express-session');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    Post.findAll({
      raw: true,
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
    }).then(function (postData) {
      console.log('THIS IS POSTDATA', postData)
      res.render('home', { posts: postData, loggedIn: req.session.logged_in });
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {

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
    posts: posts,
  })

})

router.get('/dashboard/post/:id', withAuth, async (req, res) => {
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
      res.render("dashboardpost", {
        post: post,
        comments: commentData,
        loggedIn: req.session.logged_in,
      });
    } else {
      res.render("dashboardpost", { post: post, loggedIn: req.session.logged_in });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete('/dashboard/post/:id', withAuth, async (req, res) => {
  console.log('DELETE ROUTE HIT!!!!!!!!!!!!!!')
  console.log(req.params.id)
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
      raw: true,
    });

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

    res.render('dashboard', {
      loggedIn: req.session.logged_in,
      posts,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.put('/dashboard/post/:id', withAuth, async (req, res) => {
  console.log('EDIT ROUTE HIT')
  try {
    const postUpdate = await Post.update({
      title: req.body.title,
      content: req.body.content,
    },      
    {
      where: {
        id: req.params.id,
      }
    })

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

    res.render('dashboard', {
      loggedIn: req.session.logged_in,
      posts,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
