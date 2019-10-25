const UserAccount = require("../models/UserAccount");
const Asset = require("../models/Asset");

const createUserAccounts = async userId => {
  const assets = await Asset.find({});

  const userAccount = new UserAccount({
    userId
  });

  assets.forEach(async asset => {
    await userAccount.balances.push({
      assetId: asset.assetId,
      walletId: asset.walletId,
      assetSymbol: asset.assetSymbol,
      assetName: asset.assetName
    });
  });

  userAccount.save();
};

module.exports = createUserAccounts;
