"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: './.env.local' });
const app_1 = __importDefault(require("./app"));
const port = process.env.SERVER_PORT || 3000;
app_1.default.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
