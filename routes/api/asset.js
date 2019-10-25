const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Asset = require("../../models/Asset");

// @route     GET api/platformAccount/create
// @desc      Create account
// @access    Private

// @ legacy - protect the route with admin permissions + JWT
router.post(
  "/create",
  [
    check("assetId", "Asset is required").exists(),
    check("assetSymbol", "assetSymbol is required").exists(),
    check("assetName", "assetName is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { assetId, assetSymbol, assetName } = req.body;

    try {
      let asset = await Asset.findOne({ assetId });
      if (asset) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Asset already exists" }] });
      }

      asset = new Asset({
        assetId,
        assetSymbol,
        assetName
      });

      await asset.save();
      res.json({ msg: "Asset successfully created" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
