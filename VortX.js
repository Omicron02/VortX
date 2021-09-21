const Discord = require("discord.js")
const client = new Discord.Client({intents:["GUILDS","GUILD_MESSAGES"]})
const ytdl = require("ytdl-core")

const dotenv = require("dotenv")
dotenv.config()
client.login(process.env.TOKEN)

PREFIX=process.env.PREFIX
const globalSongQueue = new Map()

function PP_Embed(msg)
{
    let ppsize="=".repeat(parseInt(Math.random()*14))
    return new Discord.MessageEmbed()
            .setTitle("**Peepee Size Machine**")
            .setColor("RANDOM")
            .setDescription(msg.author.username+"'s penis size: \n8"+ppsize+"D")
            .setThumbnail(msg.author.avatarURL())
}

function PP_Embed_Slash(intr)
{
    let ppsize="=".repeat(parseInt(Math.random()*14))
    return new Discord.MessageEmbed()
            .setTitle("**Peepee Size Machine**")
            .setColor("RANDOM")
            .setDescription(intr.member.user.username+"'s penis size: \n8"+ppsize+"D")
            .setThumbnail(intr.member.user.avatarURL())

}

function Ping_Embed_Slash(intr)
{
    return new Discord.MessageEmbed()
            .setTitle(`Hello ${intr.member.user.username}!`)
            .setColor("RANDOM")
            .setThumbnail(intr.member.user.avatarURL())
}
function Ping_Embed(msg)
{
    return new Discord.MessageEmbed()
            .setTitle(`Hello ${msg.author.username}!`)
            .setColor("RANDOM")
            .setThumbnail(msg.author.avatarURL())
}

async function Play_Song(msg, Command, serverSongQueue)
{
    const voiceChannel=msg.member.voice.channel
    console.log(voiceChannel)
    if(!voiceChannel)
        return msg.channel.send("You need to be in a voice channel to play music!")
    
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
        return msg.channel.send("I need the permissions to join and speak in your voice channel!");

    const songInfo = await ytdl.getInfo(Command[1])
    const song = {title: songInfo.title, url: songInfo.video_url}

    if (!serverSongQueue)
    {
        const queue = 
        {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        }
        globalSongQueue.set(msg.guild.id, queue)
        queue.songs.push(song)

        try
        {
            var conn = await voiceChannel.join()
            queue.connection = conn
            Queue_Play_Recursive(msg.guild,queue.songs[0])
            
        }
        catch(err)
        {
            console.log(err)
            globalSongQueue.delete(msg.guild.id)
            return
        }
    }
    else
    {
        serverSongQueue.songs.push(song)
        return msg.channel.send(`${song.title} has been added to the queue!`)
    }
}

function Queue_Play_Recursive(guild, song)
{
    const serverSongQueue = globalSongQueue.get(guild.id)
    if (!song)
    {
        serverSongQueue.voiceChannel.leave()
        globalSongQueue.delete(guild.id)
        return
    }

    const dispatcher = serverSongQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => 
        {
            serverQueue.songs.shift();
            Queue_Play_Recursive(guild, serverSongQueue.songs[0])
        })
        .on("error", error => console.error(error))
    dispatcher.setVolumeLogarithmic(serverQueue.volume/5)
    serverSongQueue.textChannel.send(`Start playing: **${song.title}**`)
}

client.on("ready", () =>
{
    console.log(`Logged in as ${client.user.tag}!`)

    // let slashCommands=client.application?.slashCommands
    // slashCommands?.create(
    // {
    //     name: "pp",
    //     description: "Shows pp size"
    // })
})

client.on("interactionCreate", async intr =>
{
    if(!intr.isCommand())
        return
    const {commandName, options}=intr

    if (commandName === "ping")
    {
        intr.reply({embeds: [Ping_Embed_Slash(intr)]})
    }  
    else if (commandName === "pp")
    {
        intr.reply({embeds: [PP_Embed_Slash(intr)]})
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
        msg.channel.send({embeds: [Ping_Embed(msg)]})
    }
    
    //else if(["play","p"].includes(Command[0]))
    // else if (Command[0]==="play")
    // {
    //     Play_Song(msg, Command, serverSongQueue)
    // }

    else if (["pp","peepee","penis","peen"].includes(Command[0]))
    {
        msg.channel.send({embeds: [PP_Embed(msg)]})
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

