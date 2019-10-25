const mongoose = require("mongoose");

const UserBalanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  balances: [
    {
      assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "asset"
      },
      walletId: {
        type: mongoose.Schema.Types.ObjectId
      },
      pubKey: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      balance: {
        type: Number
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      deletedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = UserBalance = mongoose.model("userBalance", UserBalanceSchema);
