"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.local' });
const dbConfig = {
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};
exports.dbConfig = dbConfig;
const pool = new pg_1.Pool(dbConfig);
exports.default = pool;
