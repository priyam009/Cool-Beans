require("dotenv").config();
const { google } = require("googleapis");
const router = require("express").Router();
global.atob = require("atob");
const db = require("../../models");
const jwt = require("jsonwebtoken");

const googleConfig = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirect: "http://localhost:3000/"
};

// Create the google auth object which gives us access to talk to google's apis
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

// Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: "openid email profile"
  });
}

// Create the google url to be sent to the client.
function urlGoogle() {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
}

// Extract the email and id of the google account from the "code" parameter.
async function getGoogleAccountFromCode(code) {
  // get the auth "tokens" from the request
  const auth = createConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;

  // add the tokens to the google api so we have access to the account
  auth.setCredentials(tokens);

  // return so we can login or sign up the user
  return {
    tokens: tokens
  };
}


function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

router.get("/signin", (req, res) => {
  let url = urlGoogle();
  // console.log("url", url);
  res.json({ url: url});
});

router.post("/token", function(req, res) {
  // console.log(req.body.code);
  let info= getGoogleAccountFromCode(req.body.code);
  info.then(function(result) {
    // console.log("result", result);
    const token = parseJwt(result.tokens.id_token);

    const iss = token.iss === 'https://accounts.google.com' || "accounts.google.com";
    const aud = token.aud === googleConfig.clientId;
    const isEmailVerified = token.email_verified;

    if(iss && aud && isEmailVerified) {
      // console.log(token);
      req.session.user = {
        email: token.email,
        name: token.name
      }
      console.log("session",req.session);
      res.cookie("userData", req.session.user);
        res.json({user:req.session.user});
    }
  })
});

module.exports = router;
