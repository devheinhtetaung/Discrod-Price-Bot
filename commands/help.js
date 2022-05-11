const Discord = require("discord.js");
module.exports = {
  name: 'help',
  description: 'Help Option',
  async execute(message, args) {
    message.reply("Hello I am Price Bot. You can get the price of coin using command [/price].Don't forget to put the symbol of the coin you want to know the price behind [/price]. Example- if you want to know the price of Solana , just send '/price SOL'.");
  }
}
