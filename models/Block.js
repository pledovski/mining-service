const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
  // poolId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "pool"
  // },
  // assetId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "asset"
  // },
  blockHash: {
    type: "string",
    required: true
  },
  blockHeight: {
    type: "number",
    required: true
  },
  blockReward: {
    type: "number",
    required: true
  },
  blockGenerationTime: {
    type: 'number',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  confirmationsLeft: {
    type: Number,
    required: true
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
    required: true
  },
  foundAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Block = mongoose.model("block", BlockSchema);
