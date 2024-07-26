const express = require("express");
const router = express.Router();

// Default route
router.get("/", (req, res) => {
  res.send("Welcome to Deli Efrida Application");
});

module.exports = router;
