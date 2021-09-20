const Discord = require("discord.js")
const client = new Discord.Client({intents:["GUILDS","GUILD_MESSAGES"]})

const dotenv = require("dotenv")
dotenv.config()
client.login(process.env.TOKEN)

PREFIX=process.env.PREFIX

function Ping_Embed(msg)
{
    return new Discord.MessageEmbed()
            .setTitle(`Hello ${msg.author.username}!`)
            .setColor("RANDOM")
            .setThumbnail(msg.author.avatarURL())
}

client.on("ready", () =>
{
    console.log(`Logged in as ${client.user.tag}!`)

    let slashCommands=client.application?.slashCommands
    slashCommands?.create(
    {
        name: "ping",
        description: "Replies with hello user embed"
    })
})

client.on("interactionCreate", async intr =>
{
    if(!intr.isCommand())
        return
    const {commandName,options} = intr

    if (commandName === "ping")
    {
        intr.channel.send({embeds: [Ping_Embed(intr)]})
    }  
})

client.on("messageCreate", msg =>
{
    if (msg.author.bot || !msg.content.startsWith(PREFIX))
        return

    var Command=msg.content.toLowerCase().slice(PREFIX.length).split(" ")
    
    if(Command[0]==="ping")
    {
        msg.channel.send({embeds: [Ping_Embed(msg)]})
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

