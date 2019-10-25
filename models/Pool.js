const mongoose = require("mongoose");

const PoolSchema = new mongoose.Schema({
  poolName: {
    type: String,
    required: true
  },
  poolId: {
    type: Number,
    required: true,
    unique: true
  },
  algo: {
    type: String,
    required: true
  },
  minersCount: {
    type: Number,
    required: true
  },
  totalHashrate: {
    type: Number,
    required: true
  },
  power: {
    type: Number,
    required: true
  },
  fetchedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Pool = mongoose.model("pool", PoolSchema);
