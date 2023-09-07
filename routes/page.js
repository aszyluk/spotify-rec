const express = require("express");
const router = express.Router();
const path = require("path");
const axios = require("axios");
const queryString = require("node:querystring");

router.get("/", async (req, res) => {
  try {
    if (!req.session.token) {
      const { data } = await axios.post(
        "https://accounts.spotify.com/api/token",
        queryString.stringify({
          grant_type: "authorization_code",
          code: req.query.code,
          redirect_uri: "http://localhost:3000",
        }),
        {
          headers: {
            Authorization: `Basic ${process.env.SPOTIFY_AUTH}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      req.session.token = data.access_token;
    }
    res.sendFile(path.resolve("static/index.html"));
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).json({ error: "Page not sent" });
  }
});

module.exports = router;
