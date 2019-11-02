const mongoose = require("mongoose");

const UserAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  accounts: [
    {
      assetId: {
        type: Number,
        // ref: "asset"
      },
      walletId: {
        type: Number,
      },
      assetSymbol: {
        type: String,
        required: true,
      },
      assetName: {
        type: String,
        required: true,
      },
      // pubKey: {
      //   type: String,
      //   required: true
      // },
      createdAt: {
        type: Date,
        default: Date.now
      },
      balance: {
        type: Number,
        default: 0
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = UserAccount = mongoose.model("userAccount", UserAccountSchema);
