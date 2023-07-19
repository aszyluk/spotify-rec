const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", async (req, res) => {
  try {
    res.sendFile(path.resolve("static/index.html"));
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).json({ error: "Page not sent" });
  }
});

module.exports = router;
