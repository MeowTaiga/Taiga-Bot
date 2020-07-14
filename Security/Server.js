

export class Server {
    constructor(message) {
        this.message = message;
        this.options = {
            AI: false,
            Security: false,
            Fun: false,
            BlockedChannels: [],
            BadWordFilter: [],
            Music: false,
            Mod: false,
            Prefix: false,
        }
    }
}   