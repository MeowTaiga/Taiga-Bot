import { MessageEmbed } from 'discord.js'
import { updateStat } from '../../Database/User.js';
import { getBankPromise } from '../../Database/Functions.js';
import { NoMoney } from './NoMoney.js';

let Embed = new MessageEmbed;
let options = [`🐋`, `🍎`, `🍉`, `🍍`, `🍓`];

export function Slots(message) {

    getBankPromise(message).then(bank => {
        
        if(bank.money < 100) return message.channel.send(NoMoney);

        Embed.title = `💰 Coin Slots 💰`
        Embed.footer = `Match Two to breakeven, Match Three to Double!`
        Embed.color = `#90ee90`;

        let rollOne = options[Math.floor(Math.random() * options.length)];
        let rollTwo = options[Math.floor(Math.random() * options.length)];
        let rollThree = options[Math.floor(Math.random() * options.length)];

        Embed.fields = [
            {
                name: 'Did you win?',
                value: `| ${rollOne} | ${rollTwo} | ${rollThree} |`,
            },
        ]
        Embed.timestamp = new Date();
        message.channel.send(Embed);
        updateStat(message, 'slots');

    });
}