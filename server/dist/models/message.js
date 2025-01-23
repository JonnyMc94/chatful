"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Message_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
let Message = Message_1 = class Message extends sequelize_typescript_1.Model {
    static findById(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Message_1.findOne({
                where: { userId, id },
            });
            return result;
        });
    }
    static findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Message_1.findAll({
                where: { userId },
            });
            return result;
        });
    }
    static createMessage(userId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Message_1.create({
                userId,
                message,
                timestamp: new Date(),
            });
            return result;
        });
    }
    static updateMessage(id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Message_1.update({ message }, {
                where: { id },
                returning: true,
            });
            return result[1][0];
        });
    }
    static deleteMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield Message_1.findByPk(id);
            if (message) {
                yield message.destroy();
            }
            return message;
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Message.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], Message.prototype, "timestamp", void 0);
Message = Message_1 = __decorate([
    sequelize_typescript_1.Table
], Message);
Message.belongsTo(user_1.User, { foreignKey: 'userId' });
exports.default = Message;
