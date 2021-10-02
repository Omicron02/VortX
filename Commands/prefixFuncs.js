const Discord = require("discord.js")
const mongoose = require("mongoose")
const prefixSchema = require("../models/prefix")

module.exports = {prefixEdit}

async function prefixEdit(client, msg, Command)
{
    let newPrefix = await Command[1]?Command[1]:client.PREFIX
    prefixSchema.findOne({guildID: msg.guild.id}, async (err,data) =>
    {
        if(err) 
        {
            throw err
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
