const router = require('express').Router();
const { Post, User, Comment } = require('../mdoels');
const sequelize = require('../congi/config');

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes; ['id', 'comment', 'postId', 'userId', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            order: [['created_at', 'DESC']],
        })
        const post = db
    }
})