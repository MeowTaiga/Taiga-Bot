import { con } from "../TaigaBOT/Database/Connection.js";




export async function getUserBadges(message, res) {
    await con.query(`SELECT * FROM badges WHERE discord_id = '${message.author.id}'`, function (err, results) {
        !results.length ? res(false) : res(JSON.parse(JSON.stringify(results[0])));
    });
}

export function giveBadge(message, badge) {
    con.query(`INSERT INTO badges (discord_id, messages) VALUES (${message.author.id}, ${badge})`);
}


export async function getUserStats(message, res) {
    await con.query(`SELECT * FROM stattrack WHERE discord_id = '${message.author.id}'`, function (err, results) {
        !results.length ? res(false) : res(JSON.parse(JSON.stringify(results[0])));
    });
}

export function updateStat(message, stat) {
    con.query(`UPDATE stattrack SET ${stat}=${stat}+1 WHERE discord_id = ${message.author.id}`);
}

