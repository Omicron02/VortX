const Discord = require("discord.js")
const COLOUR = "#8cff66"

function PP_Embed(msg)
{
    let ppsize="=".repeat(parseInt(Math.random()*14))
    return new Discord.MessageEmbed()
            .setTitle("**Peepee Size Machine**")
            .setColor(COLOUR)
            .setDescription(msg.author.username+"'s penis size: \n8"+ppsize+"D")
            .setThumbnail(msg.author.avatarURL())
}

function Ping_Embed(msg)
{

    return new Discord.MessageEmbed()
            .setTitle(`Hello ${msg.author.username}!`)
            .setColor(COLOUR)
            .setThumbnail(msg.author.avatarURL())
}

function Gayrate_Embed(msg)
{
    rate=parseInt(Math.random()*100+1)
    if(rate<20)
        gayness="https://img.buzzfeed.com/buzzfeed-static/static/2015-11/20/10/campaign_images/webdr12/worlds-leading-anxiety-expert-found-curing-people-2-8748-1448032226-1_dblbig.jpg"
    else if(20<=rate && rate<50)
        gayness="https://i.ytimg.com/vi/qO_Dk_Z2zRM/maxresdefault.jpg";
    else if(50<=rate && rate<80)
        gayness="https://i0.wp.com/www.culturesonar.com/wp-content/uploads/2021/06/drew-pisarra-book.jpg";
    else
        gayness="https://i1.sndcdn.com/artworks-000655332292-x1ui3u-t500x500.jpg";

    return new Discord.MessageEmbed()
            .setTitle("**Gayness Calculator**")
            .setColor(COLOUR)
            .setDescription(`${msg.author.username} is ${rate}% gay`)
            .setThumbnail(gayness)
}

module.exports = {Gayrate_Embed, Ping_Embed, PP_Embed}