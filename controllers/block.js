const request = require("request");
const config = require("config");

const Block = require("../models/Block");

const getLastBlock = async () => {
  try {
    const options = {
      uri: config.blockURI,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, async (error, response, body) => {
      try {
        const {hash, height, income, duration, generated, difficulty, accepted, rejected, status, confirmations_left} = lastPoolBlock = await JSON.parse(body).find(e => {
          return e;
        });

        const lastSavedBlock = await Block.findOne(lastPoolBlock.blockHeight);

        // console.log(lastPoolBlock);

        console.log('Block fetch script running...')

        if (lastSavedBlock == null || lastSavedBlock.blockHeight !== lastPoolBlock.height) {
          const block = new Block({
            poolId: 1,
            assetId: 1,
            blockHash: hash,
            blockHeight: height,
            blockReward: income,
            status,
            difficulty,
            confirmationsLeft: confirmations_left,
            sharesAccepted: accepted,
            sharesRejected: rejected,
            blockGenerationTime: duration,
            foundAt: generated
          });

          console.log(block);

          await block.save();
        }
      } catch (err) {
        if (error) console.error(error);

        if (response.statusCode !== 200) {
          return res.status(404).json({ msg: "Pool not found" });
        }
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

setInterval(getLastBlock, 60000);

module.exports = getLastBlock();