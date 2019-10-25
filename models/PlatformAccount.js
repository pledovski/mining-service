const mongoose = require("mongoose");

// @ legacy - itegrate wallet ID, 
const PlatformAccountSchema = new mongoose.Schema({
  assetId: {
    type: Number,
    required: true,
    unique: true
  },
  walletId: {
    type: Number,
    required: true,
    unique: true
  },
  // pubKey: {
  //   type: String,
  //   required: true
  // },
  balance: {
    type: Number,
    default: 0
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

module.exports = PlatformAccount = mongoose.model(
  "platformAccount",
  PlatformAccountSchema
);
