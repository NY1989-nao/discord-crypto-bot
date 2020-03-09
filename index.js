const Discord = require("discord.js");
const BitfinexApiWrapper = require("./lib/bitfinex-api-wrapper");
require("dotenv").config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const client = new Discord.Client();
const bfx = new BitfinexApiWrapper();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async msg => {
  if (msg.content === "/finex") {
    const candle = await bfx.getBtcUsdShorts(60);
    if (!candle) {
      return;
    }

    msg.reply(
      `\n[BTCUSD Shorts 変動通知（1時間足）]\n\n日時：${candle.day}\n\n始値\n\`\`\`diff\n${candle.openPrice}\`\`\`\n終値\n\`\`\`\diff\n${candle.closePrice}\`\`\`\n変動比率\n\`\`\`javascript\n${candle.ratio}%\`\`\``
    );
  }
});

client.login(ACCESS_TOKEN);
