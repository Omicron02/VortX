const Discord = require("discord.js")
const COLOUR = process.env.COLOUR

module.exports = {pingCmd, pingSlash}

function pingCmd(client,msg,Command)
{
    let pingEmbed = new Discord.MessageEmbed()
        .setTitle(`Hello ${msg.author.username}!`)
        .setColor(client.COLOUR)
        .setThumbnail(msg.author.avatarURL())
    msg.channel.send({embeds: [pingEmbed]})
}

function pingSlash(intr)
{
    let pingEmbedSlash = new Discord.MessageEmbed()
        .setTitle(`Hello ${intr.member.user.username}!`)
        .setColor(COLOUR)
        .setThumbnail(intr.member.user.avatarURL())
    intr.reply({embeds: [pingEmbedSlash]})
}

