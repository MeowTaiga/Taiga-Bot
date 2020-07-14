import Discord from 'discord.js';
import { con } from './Database/Connection.js';
import { config } from './config.js';
import { User } from './Database/User.js';
import { Command } from './Commands/Command.js';


const Taiga = new Discord.Client;



Taiga.on('ready', () => {
    console.log('Goodmorning Master~');

    //Connect to the Database when the bot is turned on

    con.connect(err => { if (err) throw err })
});



Taiga.on('message', (message) => {

        const user = new User(message);
        const command = new Command(message, user);

/*
    Load the User and the Reward System
    Check if a message corrosponds with a command
    Render the Command Engine
*/
        user.loadUser();
        user.loadRewards();
        command.render();
        
});


Taiga.login(config.discordToken);