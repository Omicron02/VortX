const Discord = require("discord.js")
const client = new Discord.Client({intents:["GUILDS","GUILD_MESSAGES"]})

const dotenv = require("dotenv")
dotenv.config()
client.login(process.env.TOKEN)

PREFIX="!!" 

client.on("ready", () =>
{
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg =>
{
    if (msg.author.bot)
        return
    if (msg.content===PREFIX+"ping")
    {
        msg.reply("pong");
    }
})

