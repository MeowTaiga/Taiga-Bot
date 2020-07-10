import { MessageEmbed } from 'discord.js'

let Embed = new MessageEmbed;
let options = [`🐋`, `🍎`, `🍉`, `🍍`, `🍓`];

export function Slots(message) {
    Embed.title = `💰 Coin Slots 💰`
    Embed.footer = `Match Two to breakeven, Match Three to Double!`
    Embed.color = `#90ee90`;

    let rollOne = options[Math.floor(Math.random() * options.length)];
    let rollTwo = options[Math.floor(Math.random() * options.length)];
    let rollThree = options[Math.floor(Math.random() * options.length)];
    
    Embed.fields = [
        {
            name: '1st Line',
            value: '2nd Line',
        },
        {
            name: '\u200B',
            value: `| ${rollOne} | ${rollTwo} | ${rollThree} |`,
        },
        {
            name: '5th Line',
            value: '6th Line',
        }
    ]
    Embed.description = `| ${rollOne} | ${rollTwo} | ${rollThree} |`;
    Embed.timestamp = new Date();
    message.channel.send(Embed);
    console.log(Embed);
}