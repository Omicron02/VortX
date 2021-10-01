const Discord = require("discord.js")
const mongoose = require("mongoose")
const prefixSchema = require("../models/prefix")

module.exports = {prefixEdit}

async function prefixEdit(client, msg, Command)
{
    let newPrefix = Command[1]?Command[1]:client.PREFIX
    prefixSchema.findOne({guildID: msg.guild.id}, async(e,data) =>
    {
        if(e) 
        {
            throw e
        }
        if(data)
        {
            prefixSchema.findOneAndDelete({guildID: msg.guild.id})
        }
        data = new prefixSchema
            ({
                guildID: msg.guild.id,
                prefix: newPrefix
            })
            data.save()
            msg.channel.send(`Your prefix has been updated to **${newPrefix}**`)
    })
}
