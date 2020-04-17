const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

// GET ALL
router.get('/', async (req, res) => {
    try {
        const response = await Post.find()
            .populate("author")
            .exec();
        res.json(response);
    } catch(err) {
        res.json({ message: err });
    }
});

// GET ONE
router.get('/:id', async (req, res) => {
    try {
        const response = await Post.findById(req.params.id)
            .populate("author")
            .exec();
        res.json(response);
    } catch(err) {
        res.json({ message: err });
    }
});

// ADD
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        date: req.body.date
    });

    try {
        const response = await post.save();
        res.json(response);
    } catch(err) {
        res.json({ message: err });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const response = await Post.deleteOne({ _id: req.params.id });
        res.json(response);
    } catch(err) {
        res.json({ message: err });
    }
});

// UPDATE
router.patch('/:id', async (req, res) => {
    try {
        const response = await Post.updateOne({ _id: req.params.id }, { $set: {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            date: req.body.date
        }});

        res.json(response);
    } catch(err) {
        res.json({ message: err });
    }
});

module.exports = router;
