const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const HashCoinAllocation = require("../../models/HashCoinAllocation");

// @route     GET api/platformAccount/create
// @desc      Create account
// @access    Private

// @ legacy - protect the route with admin permissions + JWT
router.post("/create", async (req, res) => {
  const { assetId, walletId, totalAllocated } = req.body;

  try {
    let account = await PlatformAccount.findOne({ walletId });
    if (account) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Account already exists" }] });
    }

    account = new PlatformAccount({
      assetId,
      walletId
    });

    await account.save();
    res.json({ msg: "Account successfully created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
