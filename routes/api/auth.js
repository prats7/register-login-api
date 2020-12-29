const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const router =  express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

//User model
const User = require('../../models/User');

//POST api/auth
//Public
router.post('/',(req, res) => {
    const { email,password } = req.body;

    //validation
    if(!email || !password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    //Find user
    User.findOne({ email })
    .then(user => {
        if(!user) return res.status(400).json({ msg : "User doesn't exists "});

        
        //Validate password
        bcrypt.compare(password,user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: "Invalid credentials"});

            jwt.sign(
                { id: user.id },
                config.get('jwtsecret'),
                (err , token ) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    })
                }
            )

        })
      
    });
});

//GET api/auth/user
//Get user data
//Private
router.get('/user',auth,(req,res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
});

module.exports = router;