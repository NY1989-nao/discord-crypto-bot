const Discord = require("discord.js");
const BitfinexApiWrapper = require("./bitfinex-api-wrapper");
const cron = require('node-cron');

module.exports = class WebhookClient {
  constructor(webhookId, webhookToken) {
    this._webhookClient = new Discord.WebhookClient(webhookId, webhookToken);
    this._bfx = new BitfinexApiWrapper();
  }

  initialize() {
    this._btcUsdShortsSchedule();
  }

  _btcUsdShortsSchedule() {
    const embed = new Discord.RichEmbed().setTitle('Some Title').setColor('#0099ff');
    // 15分足
    cron.schedule('0 0,15,30,45 * * * *', async () => {
      const candle = await this._bfx.getBtcUsdShorts(15);
      if (!candle) {
        return;
      }
    
      const msg = `\n[BTCUSD Shorts 変動通知（15分足）]\n\n日時：${candle.day}\n\n始値\n\`\`\`diff\n${candle.openPrice}\`\`\`\n終値\n\`\`\`\diff\n${candle.closePrice}\`\`\`\n変動比率\n\`\`\`javascript\n${candle.ratio}%\`\`\`\n`;
      await this._webhookClient.send(msg);
    });

    // 1時間足
    cron.schedule('0 0 */1 * * *', async () => {
      const candle = await this._bfx.getBtcUsdShorts(60);
      if (!candle) {
        return;
      }
    
      const msg = `\n[BTCUSD Shorts 変動通知（1時間足）]\n\n日時：${candle.day}\n\n始値\n\`\`\`diff\n${candle.openPrice}\`\`\`\n終値\n\`\`\`\diff\n${candle.closePrice}\`\`\`\n変動比率\n\`\`\`javascript\n${candle.ratio}%\`\`\`\n`;
      await this._webhookClient.send(msg);
    });
  }
}
