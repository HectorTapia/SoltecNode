const express = require('express');
const router = express.Router();


const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth')

router.get('/login',isNotLoggedIn, (req, res) => {
    res.render('cuenta/login');
});



router.post('/logout',isNotLoggedIn, passport.authenticate('local.singup',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/login',isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local.singin',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
    })(req, res, next)
});    
    
router.get("/sessionclose", isLoggedIn,(req, res, next) => {
    req.logOut(req.user, err => {
        if(err) return next(err);
        res.redirect("/");  
    });
});

module.exports = router;