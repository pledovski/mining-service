const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const PlatformAccount = require("../../models/PlatformAccount");

// @route     GET api/platformAccount/create
// @desc      Create account
// @access    Private

// @ legacy - protect the route with admin permissions + JWT
router.post(
  "/create",
  [
    check("assetId", "Asset is required").exists(),
    check("walletId", "Asset is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { assetId, walletId } = req.body;

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
  }
);

// @route     GET api/platformAccount/deposit
// @desc      deposit
// @access    Private

// @ legacy - protect the route with admin permissions + JWT
router.post(
  "/deposit",
  [
    check("assetId", "Asset is required").exists(),
    check("walletId", "Asset is required").exists(),
    check("amount", "Amount is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { assetId, walletId, amount } = req.body;

    try {
      let account = await PlatformAccount.findOne({ assetId });

      if (!account) {
        return res.status(404).json({ errors: [{ msg: "Account not found" }] });
      }

      const newAccountBalance = account.balance + amount;

      account = await PlatformAccount.findOneAndUpdate(
        { assetId: account.assetId },
        {
          balance: newAccountBalance
        },
        { new: true }
      );

      return res.json(account);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;


// @route     GET api/platformAccount/withdraw
// @desc      withdraw
// @access    Private

// @ legacy - protect the route with admin permissions + JWT
router.post(
  "/withdraw",
  [
    check("assetId", "Asset is required").exists(),
    check("walletId", "Asset is required").exists(),
    check("amount", "Amount is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { assetId, walletId, amount } = req.body;

    try {
      let account = await PlatformAccount.findOne({ assetId });

      if (!account) {
        return res.status(404).json({ errors: [{ msg: "Account not found" }] });
      }

      const newAccountBalance = account.balance - amount;

      if(newAccountBalance < 0) {
        return res.status(403).json({ errors: [{ msg: "Forbidden. Not enough balance." }] });
      }

      account = await PlatformAccount.findOneAndUpdate(
        { assetId: account.assetId },
        {
          balance: newAccountBalance
        },
        { new: true }
      );

      return res.json(account);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
