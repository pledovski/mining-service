const mongoose = require("mongoose");

const PlatformBalanceSchema = new mongoose.Schema({
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
  pendings: [
    {
      deposit: {
        type: Number
      },
      withdrawal: {
        type: Number
      },
      total: {
        type: Number
      }
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = PlatformBalance = mongoose.model(
  "platformBalance",
  PlatformBalanceSchema
);
