import { Slots } from "./Fun/Slots.js";
import { loadProfile, editProfile } from "./User/Profile.js";
import { loadServer } from "../Security/Server.js";
import { messageCheck } from "../Security/Security.js";

export function loadCommands(message, Taiga) {
    //Check Message Security
    loadServer(message).Security && messageCheck(message);

    //Load Arguments and a Prefix if the server has one enabled
    const args = message.content.split(/ +/);
    const prefix = loadServer(message).Prefix;

    let command = args[0];

    //If the prefix exists, make it work
    if(prefix && !message.content.startsWith(prefix)) return;
    if(prefix) command = args[0].replace(prefix, ``);


    //Check the command against our collection
    switch(command) {
        case 'slot':
        case 'slots':
        case '777':
            return Slots(message);
        case `info`:
        case 'profile':
        case 'p':
            return loadProfile(message, Taiga);
        case 'iedit':
        case 'pedit':
            return editProfile(message, args);
    }
}