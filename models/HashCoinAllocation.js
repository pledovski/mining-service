const mongoose = require("mongoose");

// @ legacy - itegrate wallet ID, 
const HashCoinAllocationSchema = new mongoose.Schema({
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
  assetSymbol: {
    type: String,
    required: true,
    unique: true
  },
  assetName: {
    type: String,
    required: true,
    unique: true
  },
  totalAllocated: {
    type: Number,
    default: 0
  },
  allocated: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      amount: {
        type: Number,
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = HashCoinAllocation = mongoose.model(
  "hashCoinAllocation",
  HashCoinAllocationSchema
);
