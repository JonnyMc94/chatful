"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.User = exports.sequelize = void 0;
const sequelize_1 = __importDefault(require("../sequelize"));
exports.sequelize = sequelize_1.default;
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const message_1 = require("./message");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return message_1.Message; } });
sequelize_1.default.addModels([user_1.User, message_1.Message]);
console.log("Models added");
