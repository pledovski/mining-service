const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const UserAccount = require("../../models/UserAccount");
const HashCoinAllocation = require("../../models/HashCoinAllocation");

// @route     POST api/allocation
// @desc      Allocate hash tokens
// @access    Private
router.post(
  "/allocate",
  auth,
  [
    check(
      "assetToMine",
      "Please choose where you want allocate tokens to"
    ).exists(),
    check("amount", "Amount is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { assetToMine, amount } = req.body;

    try {
      // User allocation flow

      let userHashAccount = await UserAccount.findOne(
        { userId: req.user.id },
        { accounts: { $elemMatch: { assetId: 2 } } }
      );

      if (!userHashAccount) {
        return res.status(400).json({ errors: [{ msg: "Can't find a user" }] });
      }

      const userHashBalance = Number(
        userHashAccount.accounts.map(item => item.balance)
      );

      if (!allocationAccount) {
        return res.status(400).json({ errors: [{ msg: "Asset not found" }] });
      }

      const newUserBalance = userHashBalance - amount;

      if (newUserBalance < 0) {
        return res
          .status(403)
          .json({ errors: [{ msg: "Forbidden. Not enough balance." }] });
      }

      userHashAccount = await UserAccount.findOneAndUpdate(
        { userId: req.user.id, "accounts.assetId": 2 },
        {
          $set: {
            "accounts.$.balance": newUserBalance
          }
        },
        { new: true }
      );

      // Platform allocation flow
      let allocationAccount = await HashCoinAllocation.findOne({
        assetId: assetToMine
      });
      const newPlatformBalance = allocationAccount.totalAllocated + amount;

      allocationAccount = await HashCoinAllocation.findOneAndUpdate(
        {
          assetId: assetToMine
        },
        { totalAllocated: newPlatformBalance },
        { new: true }
      );

      let userAllocation = await HashCoinAllocation.findOne({
        "allocated.userId": req.user.id
      });

      if (userAllocation) {
        const userAllocatedBalance = Number(
          userAllocation.allocated.map(item => item.amount)
        );

        let newUserAllocatedBalance = userAllocatedBalance + amount;

        await HashCoinAllocation.findOneAndUpdate(
          {
            "allocated.userId": req.user.id
          },
          {
            $set: {
              "allocated.$.amount": newUserAllocatedBalance
            }
          }
        );
      } else {
        await allocationAccount.allocated.push({
          userId: req.user.id,
          amount
        });

        await allocationAccount.save();
      }

      return res.status(200).json(userHashAccount);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route     POST api/allocation
// @desc      Create asset for token allocation
// @access    Private
// @ legacy - remove after allocation created
router.post("/create", async (req, res) => {
  try {
    const { assetId, walletId, assetSymbol, assetName } = req.body;
    const hashCoinAllocation = new HashCoinAllocation({
      assetId,
      walletId,
      assetSymbol,
      assetName,
      totalAllocated: 0
    });

    hashCoinAllocation.save();

    res.status(200).json(hashCoinAllocation);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
