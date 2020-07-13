import { con } from "./Connection.js";


/* 
    Whenever a user sends a message this function is fired, 
    We check we've seen this user, and if we have give them EXP for talking
    If not, we add them to our local database
*/

export function addUser(message) {
    con.query(`SELECT * FROM users WHERE discord_id = '${message.author.id}'`, function (err, results) {
        if(results.length == 0) {
            con.query(`INSERT INTO users (discord_id, messages) VALUES (${message.author.id}, 1)`);
            con.query(`INSERT INTO bank (discord_id) VALUES (${message.author.id})`);
        } else {
            //TODO Add cooldown for atleast 1 min to prevent spam
            con.query(`UPDATE users SET messages=messages+1 WHERE discord_id = ${message.author.id}`);
        }
    });
}

/* 
    Returns the User Structure from the database
*/

export async function getProfile(message, res) {
    await con.query(`SELECT * FROM users WHERE discord_id = '${message.author.id}'`, function (err, results) {
        !results.length ? res(false) : res(JSON.parse(JSON.stringify(results[0])));
    });
}



/* 
    Returns a Users Bank Struture Structure from the database
*/

export async function getBank(message, res) {
    await con.query(`SELECT * FROM bank WHERE discord_id = '${message.author.id}'`, function (err, results) {
        !results.length ? res(false) : res(JSON.parse(JSON.stringify(results[0])));
    });
} 



/* 
    Gives a user money in their Bank
*/

export async function giveMoney(message, type, amount) {
    getProfile(message, () => {
        con.query(`UPDATE bank SET ${type} = ? WHERE discord_id=${message.author.id}`, [amount]);
    });
}

/* 
    Updates a users profile
*/

export function updateProfile(message, toEdit, type) {
    getProfile(message, () => {
        con.query(`UPDATE users SET ${type} = ? WHERE discord_id=${message.author.id}`, [toEdit]);
    });
}