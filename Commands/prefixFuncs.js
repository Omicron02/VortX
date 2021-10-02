const mongoose = require("mongoose")
const prefixSchema = require("../models/prefix")

module.exports = {prefixEdit,prefixEditSlash}

async function prefixUpdate(client,msgintr,newPrefix)
{
    await prefixSchema.findOneAndUpdate({guildID: msgintr.guild.id}, 
        {guildID: msgintr.guild.id, prefix: newPrefix},
        {upsert: true})
}

function prefixEdit(client, msg, Command)
{
    let newPrefix = Command[1]?Command[1]:client.PREFIX
    prefixUpdate(client,msg,newPrefix)
    msg.channel.send(`Prefix has been updated to **${newPrefix}**`)
}

function prefixEditSlash(client,intr,options)
{
    let prefixCmd = options.getString("prefix_value")
    let newPrefix = prefixCmd?prefixCmd:client.PREFIX
    prefixUpdate(client,intr,newPrefix)
    intr.reply(`Prefix has been updated to **${newPrefix}**`)
}
