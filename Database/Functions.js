import { con } from "./Connection.js";
import { User } from "./User.js";


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


export async function getBankPromise(message) {
    let promise = new Promise((res, err) => {
            con.query(`SELECT * FROM bank WHERE discord_id = '${message.author.id}'`, function (err, results) {
                !results.length ? res(false) : res(JSON.parse(JSON.stringify(results[0])));
        });
    });
    return await promise;
} 




/* 
    Updates a users profile
*/

export function updateProfile(message, toEdit, type) {
    getProfile(message, () => {
        con.query(`UPDATE users SET ${type} = ? WHERE discord_id=${message.author.id}`, [toEdit]);
    });
}