const request = require("request");
const config = require("config");

const Pool = require("../models/Pool");

const getPoolStats = () => {
  try {
    const options = {
      uri: config.poolURI,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, async (error, response, body) => {
      try {
        const poolStats = await JSON.parse(body);

        console.log('Pool fetch script running...')

        if (poolStats) {
          const pool = new Pool({
            poolName: "BTC",
            poolId: 1,
            algo: "sha256",
            minersCount: poolStats.active_users,
            workersCount: poolStats.active_workers,
            totalHashrate: poolStats.hash_rate,
            power: 115000000
          });

          await pool.save();
        } else {
          console.log(res.status(500).json({ msg: "Pool not found" }));
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

setInterval(getPoolStats, 60000);

module.exports = getPoolStats();