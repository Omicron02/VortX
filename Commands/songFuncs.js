async function Play_Song(msg, Command, serverSongQueue)
{
    const voiceChannel=msg.member.voice.channel
    console.log(voiceChannel)
    if(!voiceChannel)
        return msg.channel.send("You need to be in a voice channel to play music!")
    
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
        return msg.channel.send("I need the permissions to join and speak in your voice channel!");

    const songInfo = await ytdl.getInfo(Command[1])
    const song = {title: songInfo.title, url: songInfo.video_url}

    if (!serverSongQueue)
    {
        const queue = 
        {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        }
        globalSongQueue.set(msg.guild.id, queue)
        queue.songs.push(song)

        try
        {
            var conn = await voiceChannel.join()
            queue.connection = conn
            Queue_Play_Recursive(msg.guild,queue.songs[0])
            
        }
        catch(err)
        {
            console.log(err)
            globalSongQueue.delete(msg.guild.id)
            return
        }
    }
    else
    {
        serverSongQueue.songs.push(song)
        return msg.channel.send(`${song.title} has been added to the queue!`)
    }
}

function Queue_Play_Recursive(guild, song)
{
    const serverSongQueue = globalSongQueue.get(guild.id)
    if (!song)
    {
        serverSongQueue.voiceChannel.leave()
        globalSongQueue.delete(guild.id)
        return
    }

    const dispatcher = serverSongQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => 
        {
            serverQueue.songs.shift();
            Queue_Play_Recursive(guild, serverSongQueue.songs[0])
        })
        .on("error", error => console.error(error))
    dispatcher.setVolumeLogarithmic(serverQueue.volume/5)
    serverSongQueue.textChannel.send(`Start playing: **${song.title}**`)
}