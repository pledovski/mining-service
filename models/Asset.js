const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema({
  algoId: {
    type: "number",
    required: true
  },
  logoURL: {
    type: "string"
  },
  assetSymbol: {
    type: "string",
    required: true
  },
  assetName: {
    type: "string",
    required: true
  },
  minable: {
    type: "boolean",
    required: true
  },
  canMine: {
    type: "boolean",
    required: true
  },
  totalHashrate: {
    type: "number",
    required: true
  },
  hashesAllocated: {
    type: "number",
    required: true
  },
  sharesSubmitted: {
    type: "number",
    required: true
  },
  priceUSD: {
    type: "number",
    required: true
  },
  lastBlockId: {
    type: "number",
    required: true
  },
  blockReward: {
    type: "number",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Asset = mongoose.model('asset', AssetSchema);
