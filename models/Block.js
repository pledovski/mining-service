const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
  poolId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Number,
    ref: "pool"
  },
  assetId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Number,
    ref: "asset"
  },
  blockHash: {
    type: String,
    required: true
  },
  blockHeight: {
    type: Number,
    required: true
  },
  blockReward: {
    type: Number,
    required: true
  },
  blockGenerationTime: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  paid: {
    type: Boolean,
    required: true,
    default: false
  },
  confirmationsLeft: {
    type: Number,
    // required: true
  },
  difficulty: {
    type: Number
  },
  sharesAccepted: {
    type: Number,
    required: true
  },
  sharesRejected: {
    type: Number,
    // required: true
  },
  foundAt: {
    type: Date,
    // required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Block = mongoose.model("block", BlockSchema);
