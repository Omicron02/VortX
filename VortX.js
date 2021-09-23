const Discord = require("discord.js")
const client = new Discord.Client({intents:["GUILDS","GUILD_MESSAGES"]})
const ytdl = require("ytdl-core")

const cmdFuncs = require("./Commands/commandFuncs")
const slashFuncs = require("./Commands/slashFuncs")

const dotenv = require("dotenv")
dotenv.config()
client.login(process.env.TOKEN)

const PREFIX=process.env.PREFIX
const COLOUR="#8cff66"
const globalSongQueue = new Map()


client.on("ready", () =>
{
    console.log(`Logged in as ${client.user.tag}!`)
    
    // const command=client.application?.commands.create(
    // {
    //     name: "gayrate",
    //     description: "Displays gayness"
    // })
    // console.log(command)
})

client.on("interactionCreate", async intr =>
{
    if(!intr.isCommand())
        return
    const {commandName, options}=intr

    if (commandName === "ping")
    {
        intr.reply({embeds: [slashFuncs.Ping_Embed_Slash(intr)]})
    }  

    else if (commandName === "pp")
    {
        intr.reply({embeds: [slashFuncs.PP_Embed_Slash(intr)]})
    }

    else if (commandName === "gayrate")
    {
        intr.reply({embeds: [slashFuncs.Gayrate_Embed_Slash(intr)]})
    }
})

client.on("messageCreate", msg =>
{
    if (msg.author.bot || !msg.content.startsWith(PREFIX))
        return
    const serverSongQueue = globalSongQueue.get(msg.guild.id)
    var Command=msg.content.toLowerCase().slice(PREFIX.length).split(" ")
    
    if(Command[0]==="ping")
    {
        msg.channel.send({embeds: [cmdFuncs.Ping_Embed(msg)]})
    }
    
    //else if(["play","p"].includes(Command[0]))
    // else if (Command[0]==="play")
    // {
    //     Play_Song(msg, Command, serverSongQueue)
    // }

    else if (Command[0]==="gayrate")
    {
        msg.channel.send({embeds:[cmdFuncs.Gayrate_Embed(msg)]})
    }

    else if (["pp","peepee","penis","peen"].includes(Command[0]))
    {
        msg.channel.send({embeds: [cmdFuncs.PP_Embed(msg)]})
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

