import Discord from 'discord.js';
import { messageCheck } from './Security/Security.js';
import { loadCommands } from './Commands/Commands.js';
import { con } from './Database/Connection.js';
import { addUser } from './Database/Functions.js';
import { config } from './config.js';
import { loadServer } from './Security/Server.js';
import { activeRewards } from './Rewards/Reward.js';


const Taiga = new Discord.Client;



Taiga.on('ready', () => {
    console.log('Goodmorning Master~');
    //Connect to the Database when a message is sent
    con.connect(err => { if (err) throw err })
});



Taiga.on('message', (message) => {
        //Count and log user to database
        addUser(message);

        //Give user correct awards
        activeRewards(message);

        //Check if the message is a command
        loadCommands(message, Taiga);
        
});


Taiga.login(config.discordToken);