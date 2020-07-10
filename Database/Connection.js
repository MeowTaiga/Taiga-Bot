import MySQL from 'mysql';
import { config } from '../config.js';

export const con = MySQL.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});