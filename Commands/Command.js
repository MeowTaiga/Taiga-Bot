import { User } from "discord.js";
import { Server } from "../Security/Server.js";
import { loadProfile, editProfile } from "../Commands/User/Profile.js";


export class Command {
    constructor(message, user) {
        this.user = user;
        this.message = message;
        this.server = new Server(message);
    }

    async render() {

        const u = await this.user.getUser();
        const b = await this.user.bank.getBank();
        const s = await this.user.getUserStats();
        const m = this.message;

        const args = this.message.content.split(/ +/);
        const command = args[0];
        const prefix = this.server.options.prefix;

            //If the prefix exists, make it work
        if(prefix && !message.content.startsWith(prefix)) return;
        if(prefix) command = args[0].replace(prefix, ``);


        switch(command) {
            case 'slot':
            case 'slots':
            case '777':
                return Slots(m, u, b);
            case `info`:
            case 'profile':
            case 'p':
                return loadProfile(m, u, b);
            case 'iedit':
            case 'pedit':
                return editProfile(m, args, u);
        }
    }
}