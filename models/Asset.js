const mongoose = require("mongoose");

// @ legacy
const AssetSchema = new mongoose.Schema({
  // algoId: {
  //   type: Number,
  //   required: true
  // },
  assetId: {
    type: Number,
    required: true,
    unique: true
  },
  logoURL: {
    type: String
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
  // minable: {
  //   type: Boolean,
  //   required: true
  // },
  // totalHashrate: {
  //   type: Number,
  //   required: true
  // },
  // hashesAllocated: {
  //   type: Number,
  //   required: true
  // },
  // sharesSubmitted: {
  //   type: Number,
  //   required: true
  // },
  // priceUSD: {
  //   type: Number,
  //   required: true
  // },
  // lastBlockId: {
  //   type: Number,
  //   required: true
  // },
  // blockReward: {
  //   type: Number,
  //   required: true
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Asset = mongoose.model('asset', AssetSchema);
