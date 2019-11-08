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

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function generateToken(id) {
  const token = jwt.sign({ id: id }, process.env.CLIENT_SECRET, {
    algorithm: "HS256",
    expiresIn: 86400
  });

  return token;
}

router.get("/signin", (req, res) => {
  let url = urlGoogle();

  //GET BASIC INFO
  console.log("CLIENT_ID: ", googleConfig.clientId);
  console.log("CLIENT_SECRET: ", googleConfig.clientSecret);
  console.log("URL: ", url);
  //---------------

  res.json({ url: url });
});

router.post("/token", function(req, res) {
  getGoogleAccountFromCode(req.body.code).then(function(result) {
    const access_token = result.tokens.access_token;
    const id_token = result.tokens.id_token;
    const payload = parseJwt(id_token);

    // GET INFORMATION CONSOLE LOG
    console.log("Token: ", result);
    console.log("Access Token: ", access_token);
    console.log("Payload: ", payload);
    // --------------------------

    //CHECK IF EXISTS IN DATABASE OR CREATE NEW USER
    db.User.findOne({ email: payload.email })
      .then(dbUser => {
        if (dbUser) {
          console.log("Existing User: ", dbUser);
          // const token = { id: generateToken(dbUser._id) };
          const token = generateToken(dbUser._id);

          //GET FINAL ENCRYPTED TOKEN
          console.log("Final Token", token);
          // --------------------------

          res.cookie("token", token, { maxAge: 86400 * 1000 });
          res.send(dbUser);
        } else {
          db.User.create({
            email: payload.email,
            firstName: payload.given_name,
            lastName: payload.family_name,
            picture: payload.picture
          })
            .then(newUser => {
              console.log("New User: ", newUser);
              const token = generateToken(newUser._id);

              //GET FINAL ENCRYPTED TOKEN
              console.log("Final Token", token);
              // --------------------------
    
              res.cookie("token", token, { maxAge: 86400 * 1000 });
              res.send(dbUser);
            })
            .catch(err => res.status(422).json(err));
        }
      })
      .catch(err => res.status(422).json(err));
  });
});

module.exports = router;