const { Post, User, Comment } = require('../../models');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
    console.log(req.params.id)
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            }
        })

        const currentPost = postData.get({ plain: true });
        // console.log(currentPost)

        res.render('comment', {post:currentPost, loggedIn: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/:id', withAuth, async (req, res) => {
    console.log('new comment hit')
    console.log(req.body)
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.params.id,
            username: req.session.name
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;