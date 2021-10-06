const mongoose = require("mongoose")
const commandCountSchema = require("../models/commandCount")

module.exports = {commandCountIncrement,commandCountCmd,commandCountSlash}

async function commandCountIncrement(commandName)
{
    await commandCountSchema.findOneAndUpdate({command: commandName}, 
        {$inc: {count: 1}},
        {upsert: true})
}

async function commandCountGet(commandName)
{
    let commandCount = await commandCountSchema.findOne({command: commandName})
    if (commandCount)
        return commandCount.count
    return 0
}

function commandCountCmd(msg, Command)
{
    commandCountGet(Command).then(count => 
    {
        msg.channel.send(`The command ${Command} has been used **${count}** times`)
    }).catch(e =>
    {
        console.log(e)
    })
}

function commandCountSlash(intr,commandName)
{
    commandCountGet(commandName).then(count =>
    {
        intr.reply(`The command ${commandName} has been used **${count}** times`)
    }).catch(e =>
    {
        console.log(e)
    })
    
}
