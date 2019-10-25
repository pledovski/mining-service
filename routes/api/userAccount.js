const express = require("express");
const router = express.Router();

// @route     GET api/balance
// @desc      Test route
// @access    Public
router.get("/", (req, res) => {
  res.send("Balance route");
});

module.exports = router;