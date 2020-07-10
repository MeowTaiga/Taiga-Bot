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
    Updates a users profile
*/

export function updateProfile(message, ...args) {
    getProfile(message, data => {
        let desc = args[0] ? args[0] : data.profile_desc;
        let pic = args[1] ? args[1] : data.profile_img;
        let title = args[2] ? args[2] : data.profile_title;
        let color = args[3] ? args[3] : data.profile_color;
        con.query(`UPDATE users SET profile=1, profile_desc="${desc}" profile_img="${pic}", profile_title="${title}", profile_color="${color} WHERE discord_id = ${message.author.id}`);
    });
}