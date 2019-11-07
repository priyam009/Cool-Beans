const { google } = require("googleapis");
// const axios = require("axios");
const router = require("express").Router();
global.atob = require("atob");

const googleConfig = {
  clientId:
    "762555638175-tskgfephk79264jpfd2cvrturjbahrab.apps.googleusercontent.com",
  clientSecret: "unvLHyRsev3_QKehC2VySyQY",
  redirect: "http://localhost:3000/dashboard"
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
    // scope: "https://www.googleapis.com/auth/userinfo.profile"
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

router.get("/signin", (req, res) => {
  let url = urlGoogle();
  res.json({ url: url});
});

router.post("/token", function(req, res) {
  console.log(req.body.code);
  let info= getGoogleAccountFromCode(req.body.code);
  info.then(function(result) {
    console.log(result);
  })
//   res.render("dashboard");
});

module.exports = router;
