const Discord = require("discord.js")
const client = new Discord.Client({intents:["GUILDS","GUILD_MESSAGES"]})

const dotenv = require("dotenv")
dotenv.config()
client.login(process.env.TOKEN)

PREFIX=process.env.PREFIX

client.on("ready", () =>
{
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg =>
{
    if (msg.author.bot || !msg.content.startsWith(PREFIX))
        return

    var Command=msg.content.toLowerCase().slice(PREFIX.length).split(" ")
    
    if(Command[0]==="ping")
    {
        // msg.channel.send()
        const PingEmbed = new Discord.MessageEmbed()
            .setTitle(`Hello ${msg.author.username}!`)
            .setColor("RANDOM")
            .setThumbnail(msg.author.avatarURL())
        msg.channel.send({embeds: [PingEmbed]})
    }

    // else if(Command[0]==="prefix")
    // {
    //     if(Command[1])
    //     {
    //         process.env.PREFIX=Command[1]
    //         msg.channel.send("Prefix changed to "+Command[1])
    //     }
    //     else
    //         msg.channel.send("Usage: "+PREFIX+"prefix <new prefix>")
    // }

})

