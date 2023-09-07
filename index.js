require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");

const staticServe = express.static(__dirname + "/public");

const configRoutes = require("./routes");

app.use("/public", staticServe);

app.use(
  session({
    name: "SpotifyCookie",
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 6000000 },
  })
);

app.use("/", (req, res, next) => {
  if (!req.query.code) {
    res.redirect(
      `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_ID}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=user-top-read`
    );
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
