const express = require('express');
let router = express.Router();
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const keys = require('./config/keys');

const cookieSession = require('cookie-session');
const CLIENT_PROFILE_URL = 'http://localhost:3000/profile';

//nconf
const ncon = require('./config/nconfig');


// @params {Address} is /api/auth

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/api/auth/redirect',
    passReqToCallback: true
  }, async function(request, accessToken, refreshToken, profile, done){
    // var User = usersDB.createTable(profile.id);
    var user = {
    id: profile.id,
    email: profile.emails,
    name: profile.name,
    username: profile.displayName,
    imageUrl: profile.photos[0].value
   };

  //  Solve the error here!!
   keys.User.dbname = user.id;
   keys.User.fulldetails = user;
   
   await ncon.writeFile(user);

    return done(null, user);
  }));
  router.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[keys.session.cookieKey],
    sameSite: 'strict'
}));

  router.use(passport.initialize());
  router.use(passport.session());
  
//(api/auth/redirect) Google api will query this url to get the success redirect link or failure link
router.get('/redirect', passport.authenticate('google', {
  successRedirect: CLIENT_PROFILE_URL,
  failureRedirect: 'api/auth/login/failure'
}));

//(api/auth/signin) is called by the front-end to use google api to sign in
router.get('/signin', passport.authenticate('google', {scope: ['profile', 'email']}));

//(api/auth/login/success)
//if the user is signed in, give the user properties to 
router.get('/login/success', (req, res)=>{
  if(req.user){   
    res.status(200).json({authenticate:true, user: req.user});
  }else{
    ncon.refresh();
    res.status(404).json({authenticate: false,user: null});
  }
});


router.get('/login/failure', (req, res)=>{
  res.status(500).send('Failed to authenticate, try again');
})

router.get('/logout', (req, res) =>{
    req.logout();
    ncon.refresh(); //delete the user profile
    res.status(200).json({authenticate: false});
});
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

 
module.exports = router;