const Discord = require("discord.js")
const COLOUR = process.env.COLOUR

module.exports = {downbadCmd, downbadSlash}
function downbadCmd(msg)
{
    rate=parseInt(Math.random()*100+1)
    
    let downbadEmbed = new Discord.MessageEmbed()
        .setTitle("**Downbad**")
        .setColor(COLOUR)
        .setDescription(`${msg.author.username} is ${rate}% downbad`)
        .setThumbnail(msg.author.avatarURL())
    msg.channel.send({embeds:[downbadEmbed]})
}

function downbadSlash(intr)
{
    rate=parseInt(Math.random()*100+1)

    let downbadEmbedSlash = new Discord.MessageEmbed()
        .setTitle("**Downbad**")
        .setColor(COLOUR)
        .setDescription(`${intr.user.username} is ${rate}% downbad`)
        .setThumbnail(intr.user.avatarURL())
    intr.reply({embeds: [downbadEmbedSlash]})
} 
