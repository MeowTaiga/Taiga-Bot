import { getProfile, updateProfile, getBank } from "../../Database/Functions.js";
import {MessageEmbed} from 'discord.js'
import { User } from "../../Database/User.js";


function bankIcon(amount) {
    switch(true) {
        case amount <= 100:
            return `💰`;
        default:
            return `💸`
    }
}



export async function loadProfile(message, user, bank) {

    const Embed = new MessageEmbed;

    Embed.title = user.profile_title;
    Embed.description = bank.money;

    message.channel.send(Embed);

}



export function editProfile(message, args) {
    const Embed = new MessageEmbed;

    let error = `🚨 Error ${message.author.username} 🚨`;

    Embed.color = `#90ee90`;
    //Here we check if a user supplied what they're editing
    if(!args[1] || !args[2]) {
        Embed.title = error;
        Embed.description = `Useage: <pedit> <type> <Your new setting>`
        Embed.fields = [
            {
                name: `Command Usage Error`,
                value: `Use the command example above!`,
                inline: true,
            },
            {
                name: `Command Example:`,
                value: `!pedit desc This is my new description!`,
                inline: true,
            }
        ]

        return message.channel.send(Embed);
    }


    let type = args[1];
    args.splice(0, 2);
    let toEdit = args.join(' ');
    console.log(toEdit);
    //Switch between the d ifferent types of things to edit
    switch(type) {
        case 't':
        case 'title':
            updateProfile(message, toEdit, 'profile_title');
            Embed.title = toEdit;
            break;
        case 'd':
        case 'desc':
        case 'description':
            updateProfile(message, toEdit, 'profile_desc');
            Embed.description = toEdit;
            break;
        case 'c':
        case 'color':
            updateProfile(message, toEdit, 'profile_color');
            Embed.color = toEdit; 
            break;
        default: 
            Embed.title = error;
            Embed.description = `The type '${type}' doesn't exist!`;
            Embed.fields = [
                {
                    name: `To Edit Your Title`,
                    value: `title, t`,
                    inline: true,
                },
                {
                    name: `To Edit Your description`,
                    value: `description, desc, d`,
                    inline: true,
                },
                {
                    name: `To Edit Your Color`,
                    value: `color, c`,
                    inline: true,
                },
            ]
    }
    message.channel.send(Embed);
}