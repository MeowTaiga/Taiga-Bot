import { con } from "../Database/Connection.js";
import { Bank } from "./User/Bank.js";
import { activeRewards } from "../Rewards/Reward.js";
import { BadgeList } from "../Rewards/BadgeList.js";
    /*
     *  @class User
     *  User Class That Talks to the Database    
     *  Mutiple Methods to manipluate the User Data
     */

export class User {

    constructor(message) {
        this.message = message; // Discord Message
        this.id = message.author.id; // discord_id
        this.bank = new Bank(message);
    }

    /* 
     *  Update a users Stats and Track them
     *  stats can be [slots, messages]
     */

    updateStat(stat, amount) {
        return con.query(`UPDATE stattrack SET ${stat}=${stat}+${amount} WHERE discord_id = ${this.id}`);
    }

    /* 
     *  Update a profile
     *  @Params toEdit, type
     *  type can be [profile_img, profile_title, profile_desc, profile_color]
     *  toEdit is an escaped string
     */

    updateProfile(type, toEdit) {
        con.query(`UPDATE users SET profile_${type} = ? WHERE discord_id=${this.id}`, [toEdit]);
    }

    /* 
     *  Give a user a new badge
     *  @params badge defined in BadgeList.js
     */

    giveBadge(badge) {
        let giftBadge = BadgeList.filter(list => list.name == badge);
        return con.query(`INSERT INTO badges (discord_id, badge_id) VALUES (${this.id}, ${giftBadge[0].value})`);
    } 

    /* 
     *  Checks if the User is in the database
     *  If they are give them a message
     */

    loadUser() {
        let stuff = this;
        return con.query(`SELECT * FROM users WHERE discord_id = '${stuff.id}'`, function (err, results) {
            if(results.length == 0) {
                con.query(`INSERT INTO users (discord_id) VALUES (${stuff.id})`);
                con.query(`INSERT INTO bank (discord_id) VALUES (${stuff.id})`);
                con.query(`INSERT INTO stattrack (discord_id) VALUES (${stuff.id})`);
            } else {
                //TODO Add cooldown for atleast 1 min to prevent spam
                stuff.updateStat('messages', 1);
            }
        });
    }

    loadRewards() {
        activeRewards(this.message, this);
    }

    // Returns the User Object
    async getUser() {
        return await new Promise((res, err) => {
            con.query(`SELECT * FROM users WHERE discord_id = '${this.id}'`, function (err, results) {
                !results.length ? res(false) : res(JSON.parse(JSON.stringify(results[0])));
            });
        })
    }

    //Return all user badges
    async getUserBadges() {
        let promise = new Promise((res, err) => {
            con.query(`SELECT * FROM badges WHERE discord_id = '${this.id}'`, function (err, results) {
                !results.length ? res(false) : res(JSON.parse(JSON.stringify(results)));
            });
        });
        return await promise;
    }

    //return all user stats
    async getUserStats() {
        let promise = new Promise((res, err) => {
            con.query(`SELECT * FROM stattrack WHERE discord_id = '${this.id}'`, function (err, results) {
                !results.length ? res(false) : res(JSON.parse(JSON.stringify(results[0])));
            });
        });
        return await promise;
    }
}

