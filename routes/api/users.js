const express = require('express');
const router  = express.Router();
const gravatar = require('gravatar');
const bcrypt   = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport')

//Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const keys = require('../../config/keys');
const User    = require('../../models/User');

// @route  GET api/users/test
// @desc   Tests users route
// @access Puplic
router.get('/test', (req,res) => res.json({msg:'users works'}))

// @route  POST api/users/register
// @desc   Register User
// @access Puplic
router.post('/register', (req,res) => {
    const { errors , isValid } = validateRegisterInput(req.body);


    //Check Validation
    if (!isValid){
        res.status(400).json(errors);
    }


    User.findOne({ email : req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({email:'User already exist'});
        } else {
            const avatar = gravatar.url(req.body.email, {
                s:'200',
                r:"pg",
                d:'mm'
            })

            const newUser = new User({ 
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            })

            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            })
        }
    })
})


// @route  POST api/users/login
// @desc   login User & send a jwt (token)
// @access Puplic
router.post('/login', (req,res) => {
    const { errors , isValid } = validateLoginInput(req.body);


    //Check Validation
    if (!isValid){
        res.status(400).json(errors);
    }


    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(404).json({email:'User not found'});
        }

        bcrypt.compare(password,user.password)
        .then(isMatched => {
            if(isMatched){
                const payload = {
                    id:user.id,
                    name:user.name,
                    avatar:user.avatar
                }

                jwt.sign(payload , keys.secretOrKey , {expiresIn : 3600} , (err,token) =>{
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
                } )

            } else {
                return res.status(400).json({password:'Password is incorrect'});
            }
        })
    } )
})

// @route  GET api/users/current
// @desc   return current user
// @access Protected

router.get('/current', passport.authenticate('jwt', { session: false }), (req,res) =>{
    res.json(req.user)
});



module.exports = router;