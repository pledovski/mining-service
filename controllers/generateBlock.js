const Block = require("../models/Block");

const generateBlock = async () => {
  try {
    newBlock = new Block({
      poolId: 666,
      assetId: 1,
      blockHash:
        "00000000000008a3a41b85b8b29ad444def299fee21793cd8b9e567eab02cd81",
      blockHeight: 666,
      blockReward: 12.5,
      blockGenerationTime: 600000,
      status: "unconfirmed",
      paid: false,
      sharesAccepted: 12169755556160
    });

    await newBlock.save();
    console.log("Block generated");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

setInterval(generateBlock, 60000);

const confirmBlock = async () => {
  const unconfirmedBlock = await Block.findOne({ status: "unconfirmed" });
  console.log("Confirmator launched");
  if (unconfirmedBlock) {
    setTimeout(async () => {
      confirm = await Block.findOneAndUpdate(
        { status: "unconfirmed" },
        { status: "confirmed" }
      );
      console.log("Block confirmed: ", confirm);
    }, 30000);
  }
};

setInterval(confirmBlock, 66000);

module.exports = { generateBlock, confirmBlock };
