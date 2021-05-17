const { Post, User, Comment } = require('../../models');
const router = require('express').Router();

router.get('/:id', async (req, res) => {
    console.log("THIS IS USER DATA", req.session)
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
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
        })
        const post = dbPostData.get({ plain: true});
        console.log(post)

        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            raw: true
        })
        
        if(commentData) {
            res.render('post', {post: post, comments: commentData, loggedIn: req.session.logged_in});
        } else {
            res.render('post', {post: post, loggedIn: req.session.logged_in});
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;