const UserAccount = require("../models/UserAccount");
const Asset = require("../models/Asset");

const createUserAccounts = async userId => {
  try {
    const assets = await Asset.find({});

    const userAccount = new UserAccount({
      userId
    });

    assets.forEach(async asset => {
      await userAccount.accounts.push({
        assetId: asset.assetId,
        walletId: asset.walletId,
        assetSymbol: asset.assetSymbol,
        assetName: asset.assetName
      });
    });

    userAccount.save();
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = createUserAccounts;
