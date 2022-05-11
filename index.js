const express = require("express");
const app = express()
const fs = require('fs');
app.listen(3000, () => {
  console.log('Price Bot is ready to serve! ASAP')
})

app.get("/", (req, res) => {
  res.send("Price Bot is Ready to help ASAP!");
})

const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const prefix = '/';
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}
client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) message.reply("Command doesn't Exist")
  if (command === 'price') {
    client.commands.get('price').execute(message, args);
  }
  if (command === 'help') {
    client.commands.get('help').execute(message, args);
  }
});

client.login("your discord app oauth token");