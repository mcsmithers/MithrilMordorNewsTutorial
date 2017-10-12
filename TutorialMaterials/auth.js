import passport from 'passport';
import auth0 from 'auth0';

var Auth0Strategy = require('passport-auth0'),
    passport = require('passport');

var strategy = new Auth0Strategy({
   domain:       'url.auth0.com',
   clientID:     'your-id',
   clientSecret: 'your-secret',
   callbackURL:  'http://localhost:5000'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);

passport.use(strategy);

app.get('/callback',
passport.authenticate('auth0', { failureRedirect: '/login' }),
function(req, res) {
  if (!req.user) {
    throw new Error('user null');
  }
  res.redirect("/");
}
);

app.get('/login',
passport.authenticate('auth0', {}), function (req, res) {
res.redirect("/");
});

var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://uri.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=241930&count=5&maxlength=300&format=json',
    issuer: "https://issuer.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

app.listen(port);

