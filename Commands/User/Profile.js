import {MessageEmbed} from 'discord.js'
import { BadgeList } from '../../Rewards/BadgeList.js';


function bankIcon(amount) {
    switch(true) {
        case amount <= 100:
            return `💰`;
        default:
            return `💸`
    }
}

function renderBadges(badge) {
    if(!badge) return `No Badges to Display`;
    let badgeString = ``;
    badge.map(b => {
        let thisBadge = BadgeList.filter(list => list.value == b.badge_id);
        thisBadge[0].ani ? 
              badgeString += `<a:${thisBadge[0].name}:${thisBadge[0].value}> `
            : badgeString += `<:${thisBadge[0].name}:${thisBadge[0].value}> `
    });
    return badgeString;
}

export async function loadProfile(message, user, bank, stats, badge) {

    const profile = new MessageEmbed;

    profile.color = user.profile_color;
    profile.title = user.profile_title;
    profile.description = user.profile_desc;
    profile.addField(`${bankIcon(bank.money)} Banked Money`, `${bank.money}`, true);
    profile.addField(`💎 Gems`, `${bank.cookies}`, true); 
    profile.addField(`Badges`, renderBadges(badge), false);  
    profile.setFooter(`${stats.messages} Messages Sent`);
    message.delete();
    message.channel.send(profile);

}



export function editProfile(message, args, user) {

    const edit = new MessageEmbed;
    edit.color = `#907790`;

    if(!args[1] || !args[2]) {
        edit.title = `Command Usage Error`;
        edit.description = `You're missing some arguments!`;
        edit.addField(`Use the command as shown below (no <> needed)`, `<pedit> <title> <this is my new title>`);

        return message.channel.send(edit);
    }
    let type = args[1];
    args.splice(0, 2);
    let toEdit = args.join(" ");
    
    switch(type) {
        case 't':
        case 'title':
            type = 'title';
            user.updateProfile('title', toEdit);
            break;
        case 'c':
        case 'color':
            if(toEdit.includes(' ') || toEdit.length !== 7 || !toEdit.includes('#')) {
                return message.channel.send('The correct color format is #000000 !');
            }
            edit.color = toEdit;
            type = 'color';
            user.updateProfile('color', toEdit);
            break;
        case 'd':
        case 'desc':
        case 'descrption':
            type = 'descrption';
            user.updateProfile('desc', toEdit);
            break;
        default:
            edit.title = `Type ${type} doesn't exist!`;
            edit.addField('Edit Title:', `t, title`, true);
            edit.addField('Edit Descrption:', `d, desc, descrption`, true);
            edit.addField('Edit Colr:', `c, color`, true);
            return message.channel.send(edit); 
    }

    edit.title = `Your new ${type} is set!`;
    edit.description = `use the command profile to view your change!`;

    return message.channel.send(edit);

}