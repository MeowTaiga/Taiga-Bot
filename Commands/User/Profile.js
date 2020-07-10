import { getProfile } from "../../Database/Functions.js";
import {MessageEmbed} from 'discord.js'

const Embed = new MessageEmbed;



export function loadProfile(message) {
    
    getProfile(message, data => {
        if(!data) return;
        Embed.title = data.profile_title;
        Embed.description = data.profile_desc;
        Embed.color = data.profile_color;

        message.channel.send(Embed);

    });
}

export function editProfile(message, args) {
    if(!args[1]) {
        Embed.title = `🚨 Error ${message.author.username} 🚨`;
        Embed.description = `Useage: <pedit> <type> <Your new setting>`
        Embed.fields = [
            {
                name: `Command Usage Error`,
                value: `Use the command example above!`
            },
            {
                name: `Command Example:`,
                value: `!pedit desc This is my new description!`
            }
        ]

        return message.channel.send(Embed);
    }
    let type = args[1];
}