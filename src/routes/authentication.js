const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

//------------------------------------- LOGIN -----------------------------------//

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }));

//------------------------------------- SIGN UP -----------------------------------//
router.get('/signup', (req, res) => {
    res.render('auth/sign-up');
});
router.post('/signup',  passport.authenticate('local.signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }));
  

//------------------------------------- LOGOUT -----------------------------------//
  router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/home');
  });
  
  router.get('/profile', isLoggedIn, (req, res) => {
    res.render('/profile');
  });

module.exports = router;