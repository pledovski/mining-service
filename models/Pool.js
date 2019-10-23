const mongoose = require("mongoose");

const PoolSchema = new mongoose.Schema({
  poolName: {
    type: "string",
    required: true
  },
  poolId: {
    type: "number",
    required: true,
    unique: true
  },
  algo: {
    type: "string",
    required: true
  },
  minersCount: {
    type: "number",
    required: true
  },
  totalHashrate: {
    type: "number",
    required: true
  },
  power: {
    type: "string",
    required: true
  }
});

module.exports = Pool = mongoose.model("pool", PoolSchema);
