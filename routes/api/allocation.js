const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const HashCoinAllocation = require("../../models/HashCoinAllocation");

// @route     GET api/auth
// @desc      Get authenticated user
// @access    Public
router.post("/allocate", auth, [
  check("assetId", "assetId is required").exists(),
  check("walletId", "walletId is required").exists(),
  check("walletId", "walletId is required").exists()
], async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;