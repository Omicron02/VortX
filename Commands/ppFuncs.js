const Discord = require("discord.js")
const COLOUR = process.env.COLOUR

module.exports = {ppCmd, ppSlash}

function ppCmd(msg)
{
    let ppsize="=".repeat(parseInt(Math.random()*14))
    let ppEmbed = new Discord.MessageEmbed()
        .setTitle("**Peepee Size Machine**")
        .setColor(COLOUR)
        .setDescription(msg.author.username+"'s penis size: \n8"+ppsize+"D")
        .setThumbnail(msg.author.avatarURL())
    msg.channel.send({embeds: [ppEmbed]})
}

function ppSlash(intr)
{
    let ppsize="=".repeat(parseInt(Math.random()*14))
    let ppEmbedSlash = new Discord.MessageEmbed()
        .setTitle("**Peepee Size Machine**")
        .setColor(COLOUR)
        .setDescription(intr.user.username+"'s penis size: \n8"+ppsize+"D")
        .setThumbnail(intr.user.avatarURL())
    intr.reply({embeds: [ppEmbedSlash]})
}
