const express = require('express');
const bcrypt = require('bcryptjs');
const router =  express.Router();
const jwt = require('jsonwebtoken');
const assert = require('assert');
const results = require('../../LoginResponse/loginResponseEnum');

//Results
const success = results.SUCCESS();
const fail = results.FAIL();


//User model
const User = require('../../models/User');


// @route GET api/users
// @route  Register new user
// @access public
router.post('/',(req, res) => {
    const { name,email,password } = req.body;

    //validation
    if(!name || !email || !password){
        return (
            //res.status(400).json({msg: 'Please enter all fields'});
            jwt.sign(
                res.status(400).json({msg: 'Please enter all field'}), () => { assert.strictEqual(fail,'Please enter all field')}
            )
        )
    }

    //Find user
    User.findOne({ email })
    .then(user => {
        if(user) return (
            //res.status(400).json({ msg : "User already exists "})
            jwt.sign(
                res.status(400).json({msg: 'User already exist'}), () => { assert.strictEqual(fail,'User already exist')}
            )
        )

        const newUser = new User({
            name,
            email,
            password
        });

        //password encryption
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt,(err,hash)=>{
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {

                    jwt.sign(
                        { id: user.id },
                        "secret",
                        (err , token ) => {
                            if(err) assert.throws(fail,err);
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        },() => { assert.strictEqual(success,"SUCCESS ")}
                    )

                    
                });
            });
        })
    });
});


module.exports = router;