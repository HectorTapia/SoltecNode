const express = require('express');
const stripe = require('stripe')('sk_test_51OCQCXA889WcHb93C9JF6fd5fZM214NfYJy5V77ODQXyUA4QVYpccWOAQfpJuBRficl69Fquzeckki8FU0d9jP3P00U3WfrglN');
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

router.post('/pago', async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        
      });
  print('pago entro');
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });

module.exports = router;