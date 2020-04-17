const express = require('express');
const router = express.Router();

const Author = require('../models/Author');
const Post = require('../models/Post');

// GET ALL
router.get('/', async (req, res) => {
    try {
        const response = await Author.find();
        res.json(response);
    } catch(err) {
        res.json({ message: err });
    }
});

// GET ONE
router.get('/:id', async (req, res) => {
    try {
        const response = await Author.findById(req.params.id);
        res.json(response);
    } catch(err) {
        res.json({ message: err });
    }
});

// ADD
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name,
        bio: req.body.bio
    });

    try {
        const response = await author.save();
        res.json(response);
    } catch(err) {
        res.json({ message: err });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        // Delete post of the author
        const postDeleted = await Post.deleteMany({ author: req.params.id });

        // Delete author
        const response = await Author.deleteOne({ _id: req.params.id });
        res.json(postDeleted);
    } catch(err) {
        res.json({ message: err });
    }
});

// UPDATE
router.patch('/:id', async (req, res) => {
    try {
        const response = await Author.updateOne({ _id: req.params.id }, { $set: {
            name: req.body.name,
            bio: req.body.bio
        }});

        res.json(response);
    } catch(err) {
        res.json({ message: err });
    }
});

module.exports = router;
