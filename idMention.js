module.exports = (str) => 
{
    if (str.startsWith("<@") && str.endsWith(">"))
    {
        let mentionId=str.slice(2,-1)
        if (mentionId.startsWith("!"))
            mentionId=mentionId.slice(1)
    }
}