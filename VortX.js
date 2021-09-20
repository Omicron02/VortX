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
    if (msg.content.startsWith(PREFIX))
    {
        var Command=msg.content.toLowerCase().slice(PREFIX.length).split(" ")
        
        if(Command[0]==="ping")
        {
           // msg.channel.send()
            const embed = new Discord.MessageEmbed()
                .setTitle(`Hello ${msg.author.username}!`)
                .setColor("RANDOM")
                .setThumbnail(msg.author.avatarURL())
            msg.channel.send({embeds: [embed]})
        }
    }
})

