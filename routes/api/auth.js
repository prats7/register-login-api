const express = require('express');
const bcrypt = require('bcryptjs');
const router =  express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const assert = require('assert');
const auth = require('../../middleware/auth');
const results = require('../../LoginResponse/loginResponseEnum');
var num = 3;

//Results
const success = results.SUCCESS();
const fail = results.FAIL();
const blocked = results.BLOCKED();

//User model
const User = require('../../models/User');

//POST api/auth
//Public
router.post('/',auth,(req, res) => {
    const { email,password } = req.body;

    //validation
    if(!email || !password){
        return (
           // res.status(400).json({msg: 'Please enter all fields'})
           jwt.sign(
            res.status(400).json({msg: 'Please enter all field'}), () => { assert.strictEqual(fail,'Please enter all field')}
        )
        )
    }

    //Find user
    User.findOne({ email })
    .then(user => {
        if(!user){
            return (
                //res.status(400).json({ msg : "User doesn't exists "})
                jwt.sign(
                    res.status(400).json({msg: "User doesn't exists "}), () => { assert.strictEqual(fail,"User doesn't exists ")}
                )
            )

        } 
        

        
        //Validate password
        bcrypt.compare(password,user.password)
        .then(isMatch => {

            //Block user
            if(num == 0){
                () => {
                    return(
                        jwt.sign({id: user.id },
                            "secret",{expiresIn: 50},
                            res.status(401).json({msg: "User blocked "}), () => { assert.strictEqual(blocked,"User blocked ")}
                        )
                    )
                    
                }
            }

            if(!isMatch){
                num--;
                return(
                    //return res.status(400).json({ msg: "Invalid credentials"});
                    jwt.sign(
                        res.status(400).json({msg: "Invalid credentials "}), () => { assert.strictEqual(fail,"Invalid credentials ")}
                    )
                )
            } 
            

            
            jwt.sign(
                { id: user.id },
                "secret",{expiresIn: 3600},
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
                }, () => { assert.strictEqual(success,"SUCCESS ")}
            )

        })
      
    });
});


module.exports = router;