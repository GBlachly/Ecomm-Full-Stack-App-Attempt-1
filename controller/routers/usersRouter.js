const express = require('express');
const passport = require('passport');
const usersRouter = express.Router();

const { 
    getUserInfo,
    registerUser, 
    updateUsername, 
    updatePassword,
    deleteUser
} = require('../models/usersModel');


// ROUTES 
/* logout user */
usersRouter.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
    });
    res.status(200).send('User logged out');
    //res.redirect("/login");
  }
);
  

/* get/load login page  */
usersRouter.get('/login', (req, res, next) => {
    res.status(200).send('Welcome to the Login Page');
    //res.render();
});


/* login user with local strategy */
usersRouter.post(
    '/login', 
    passport.authenticate("local"/*, { failureRedirect: '/login', failureMessage: true} */), 
    (req, res, next) => {
        res.status(200).send(`User: ${req.user.username} w/ email ${req.user.email} logged in`)
    }
);

/* get user info (once logged in) */
usersRouter.get('/', getUserInfo);

/* create new user (authentication of user not needed) */
usersRouter.post('/register', registerUser);


/* update user usename  */
usersRouter.put('/username', updateUsername);


/* update user password */
usersRouter.put('/password', updatePassword);


/* delete user account  */
usersRouter.delete('/delete', deleteUser);


/* login user with google strategy */


/* login user with facebook strategy */


module.exports = usersRouter;