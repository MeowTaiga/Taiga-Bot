import { User } from '../User.js';
import { con } from '../../TaigaBOT/Database/Connection.js';

export class Bank {

    constructor(message) {
        this.message = message; // Discord Message
        this.id = message.author.id; // discord_id
    }

    giveMoney(type, amount) {
        con.query(`UPDATE bank SET ${type} = ${type}+? WHERE discord_id=${this.id}`, [amount]);
    }

    async getBank() {
        return await new Promise((res, err) => {
            con.query(`SELECT * FROM bank WHERE discord_id = '${this.id}'`, function (err, results) {
                !results.length ? res(false) : res(JSON.parse(JSON.stringify(results[0])));
            });
        });
    }
}