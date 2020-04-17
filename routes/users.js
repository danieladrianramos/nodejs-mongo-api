const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/User');

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const users = await User.find({
            username: req.body.username
        });
        
        if (users.length > 0) {
            const user = users[0];

            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result) {
                    res.json(user);
                } else {
                    res.statusCode = 401;
                    res.send('Login fail');
                }
            });
        } else {
            res.statusCode = 401;
            res.send('Login fail');
        }
    } catch(err) {
        res.json({ message: err });
    }
});

// REGISTER
router.post('/', async (req, res) => {
    try {
        const passwordHashed = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: passwordHashed
        });
    
        console.log("/// ", user);

        const response = await user.save();
        res.json(response);
    } catch(err) {
        console.log("/// ", err);
        res.json({ message: err });
    }
});

module.exports = router;
