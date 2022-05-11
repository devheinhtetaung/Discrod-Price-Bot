const Discord = require("discord.js");
const axios = require('axios')
const url1 = "https://api.nomics.com/v1/currencies/ticker?key="
const key = "your api key"
const url2 = "&ids="
const url3 = "&interval=1d,30d&per-page=100&page=1"
module.exports = {
  name: 'price',
  description: 'Get Coin price',
  async execute(message, args) {
    if (!args.length) return message.reply('You need to send the second argument!');
    const id = args[0];
    if (id.toLowerCase() === id) {
      message.reply('Use Capital Letters Only. eg. BTC,SOL.')
    } else {
      let url = url1 + key + url2 + id + url3;
      axios.get(url)
        .then(function(response) {
          const rdata = response.data;
          const data = rdata[0]
          const name = data.name
          const price = data.price
          const ms = data.max_supply
          const mc = data.market_cap
          const rank = data.rank
          const logo = data.logo_url
          const embed = new Discord.MessageEmbed( )
            .setTitle("Result for " + data.name)
            .setDescription("Price Check Results")
            .setFooter("Price Bot", "https://i.ibb.co/NZd16sR/bot.png")
            .setColor("RANDOM")
            .addField("Name", name , true)
            .addField("Current Price", price +" USD")
            //.addField("Max Supply", ms)
            .addField("Market Cap", mc)
            .addField("Rank", rank)
            .setThumbnail(logo)
            .setTimestamp()
          message.reply({ embeds: [embed] } )
        })
    }
  }
}
