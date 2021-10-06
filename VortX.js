const Discord = require("discord.js")
const client = new Discord.Client({intents:
    ["GUILDS",
    "GUILD_MESSAGES"
    ]})
//"GUILD_MEMBERS","GUILD_PRESENCES","GUILD_VOICE_STATES","GUILD_MESSAGE_REACTIONS"
 
// const ytdl = require("ytdl-core")
// const ytSearch = require("yt-search")
const mongoose = require("mongoose")

// const Song = require("./Commands/songFuncs")
const pingFuncs = require("./Commands/pingFuncs")
const ppFuncs = require("./Commands/ppFuncs")
const gayrateFuncs = require("./Commands/gayrateFuncs")
const prefixFuncs = require("./Commands/prefixFuncs")
const downbadFuncs = require("./Commands/downbadFuncs")
const commandCountFuncs = require("./Commands/commandCountFuncs")

const prefixSchema = require("./models/prefix")
// const commandCountSchema = require("./models/commandCount")

const IdFromMention = require("./idMention")

// const dotenv = require("dotenv")
// dotenv.config()
client.login(process.env.TOKEN)

mongoose.connect(process.env.MONGODB_SRV,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>
    {
        console.log("Database connection successful!")
    }).catch( e =>
    {
        console.log(e)
    })

client.PREFIX = process.env.PREFIX
client.COLOUR = process.env.COLOUR
const globalSongQueue = new Map()


client.on("ready", () =>
{
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity("Eye To Eye", {type: "LISTENING"})
    
    // const command=client.application?.commands.create(
        
    //     )
    // console.log(command)

    
})

client.on("interactionCreate", async intr =>
{
    if(!intr.isCommand())
        return

    const {commandName, options}=intr

    if (commandName === "ping")
    {
        pingFuncs.pingSlash(intr)
        commandCountFuncs.commandCountIncrement(commandName)
    }  

    else if (commandName === "pp")
    {
        ppFuncs.ppSlash(intr)
        commandCountFuncs.commandCountIncrement(commandName)
    }

    else if (commandName === "gayrate")
    {
        gayrateFuncs.gayrateSlash(intr)
        commandCountFuncs.commandCountIncrement(commandName)
    }

    else if (commandName === "prefix")
    {
        prefixFuncs.prefixEditSlash(client,intr,options)
        commandCountFuncs.commandCountIncrement(commandName)
    }

    else if (commandName === "downbad")
    {
        downbadFuncs.downbadSlash(intr)
        commandCountFuncs.commandCountIncrement(commandName)
    }

    else if (commandName === "test")
    {
        let a = options.getString("abc")
        intr.reply({content: `Data is ${a}`})
    }

    else if (commandName === "commandcount")
    {
        commandCountFuncs.commandCountSlash(intr,options.getString("command"))
        commandCountFuncs.commandCountIncrement(commandName)
    }
})

client.on("messageCreate", async msg =>
{
    var prefixData = await prefixSchema.findOne({guildID: msg.guild.id})
    const PREFIX = prefixData?prefixData.prefix:client.PREFIX;

        mentionId = IdFromMention(msg.content)
        if (mentionId===client.user.id)
            msg.channel.send({content: `My prefix is ${PREFIX}`})

    if (msg.author.bot || !msg.content.startsWith(PREFIX))
        return
    const serverSongQueue = globalSongQueue.get(msg.guild.id)
    var Command=msg.content.toLowerCase().slice(PREFIX.length).split(" ")
    
    if(Command[0]==="ping")
    {
        pingFuncs.pingCmd(client,msg,Command)
        commandCountFuncs.commandCountIncrement(Command[0])
    }
    
    // else if(["play","p"].includes(Command[0]))
    // {
    //     Song.Play_Song(msg, Command, serverSongQueue)
    // }

    else if (Command[0]==="gayrate")
    {
        gayrateFuncs.gayrateCmd(msg)
        commandCountFuncs.commandCountIncrement(Command[0])
    }

    else if (["pp","peepee","penis","peen"].includes(Command[0]))
    {
        ppFuncs.ppCmd(msg)
        commandCountFuncs.commandCountIncrement(Command[0])
    }

    else if (Command[0]==="downbad")
    {
        downbadFuncs.downbadCmd(msg)
        commandCountFuncs.commandCountIncrement(Command[0])
    }
    // else if (msg.member.voice.channel && Command[0]=="join") 
    // {
	// 	const connection = await msg.member.voice.channel.join();
    // }
    else if(Command[0]==="prefix")
    {
        prefixFuncs.prefixEdit(client,msg,Command)
        commandCountFuncs.commandCountIncrement(Command[0])
    }

    else if(Command[0]==="commandcount")
    {
        if (Command[1])
            commandCountFuncs.commandCountCmd(msg,Command[1])
        else
            msg.channel.send({content: `Usage: ${PREFIX}commandcount <commandName>`})
        commandCountFuncs.commandCountIncrement(Command[0])
    }

})

