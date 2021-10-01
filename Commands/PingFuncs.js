const Discord = require("discord.js")
const COLOUR = process.env.COLOUR

module.exports = {pingCmd, pingSlash}

function pingCmd(msg)
{

    let pingEmbed = new Discord.MessageEmbed()
        .setTitle(`Hello ${msg.author.username}!`)
        .setColor(COLOUR)
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

