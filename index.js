const Discord = require("discord.js");
const WebhookClient = require('./lib/webhook-client');
require("dotenv").config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const WEBHOOK_ID = process.env.WEBHOOK_ID;
const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN;

const webhookClient = new WebhookClient(WEBHOOK_ID, WEBHOOK_TOKEN);
webhookClient.initialize();

// const client = new Discord.Client();
// client.once("ready", () => {
  // console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on("message", async msg => {
//   if (msg.content === "/finex") {
//     msg.reply();
//   }
// });

// client.login(ACCESS_TOKEN);