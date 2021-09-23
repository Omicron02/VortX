const Discord = require("discord.js")



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

module.exports = {Ping_Embed_Slash, PP_Embed_Slash}