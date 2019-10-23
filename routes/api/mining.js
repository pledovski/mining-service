const express = require("express");
const router = express.Router();

// @route     GET api/mining
// @desc      Test route
// @access    Public
router.get("/", (req, res) => {
  res.send("Mining route");
});

module.exports = router;