
import { MessageEmbed } from 'discord.js';

const banned = [`nigger`, `nlgger`, `faggot`, `fag00t`, `fag`];

let embed = new MessageEmbed();


export function messageCheck(message) {
    if(message.author.bot) return;

    embed.color = `#90ee90`;
    embed.title = `Security`

    if(banned.includes(message.content.toLowerCase())) {
        if(message.guild.me.hasPermission("ADMINISTRATOR")) {
            message.delete();
            embed.description = `I deleted your message, consider this a warning ${message.author}`;
        } else {
            embed.description = `I really don't think you should be saying that ${message.author}, I don't have permissions to mute you or delete your message.`;
        }
        message.channel.send(embed);
    }

}