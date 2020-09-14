const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/User');

//@route Post api/users
//@desc Register all users
//access public
router.post('/', (req, res) => {
   const { firstname, lastname, email, password, role } = req.body;

   //simple validation
   if(!firstname || !lastname || !email || !password){
       return res.status(400).json({ msg: 'All fields are required.' });
   }

   //check for existing user
   User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exist.' });

        const newUser = new User({
            firstname,
            lastname,
            email,
            password,
            role
        });

        //Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 }, 
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        firstname: user.firstname,
                                        lastname: user.lastname,
                                        email: user.email
                                    }
                                });
                            }
                        )

                        // res.json({
                        //     user: {
                        //         id: user.id,
                        //         firstname: user.firstname,
                        //         lastname: user.lastname,
                        //         email: user.email
                        //     }
                        // });
                    });
            });
        });
    });
});

module.exports = router;