const Discord = require("discord.js")
const COLOUR = "#8cff66"


function PP_Embed_Slash(intr)
{
    let ppsize="=".repeat(parseInt(Math.random()*14))
    return new Discord.MessageEmbed()
            .setTitle("**Peepee Size Machine**")
            .setColor(COLOUR)
            .setDescription(intr.member.user.username+"'s penis size: \n8"+ppsize+"D")
            .setThumbnail(intr.member.user.avatarURL())

}

function Ping_Embed_Slash(intr)
{
    return new Discord.MessageEmbed()
            .setTitle(`Hello ${intr.member.user.username}!`)
            .setColor(COLOUR)
            .setThumbnail(intr.member.user.avatarURL())
}

module.exports = {Ping_Embed_Slash, PP_Embed_Slash}