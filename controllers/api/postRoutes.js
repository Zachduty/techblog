const { Post, User } = require('../../models');
const router = require('express').Router();

router.get('/:id', async (req, res) => {
    console.log('get triggered')
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
        console.log(res.user_id);

        const post = dbPostData.get({ plain: true});
        console.log(post)

        res.render('post', {
            post
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;