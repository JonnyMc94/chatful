"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../models/message"); // Import the Message model
const chatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
        // Handle new message event
        socket.on("newMessage", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { userId, message } = data;
                const newMessage = yield message_1.Message.createMessage(userId, message);
                io.emit("newMessage", newMessage);
            }
            catch (error) {
                console.error("Error creating message:", error);
            }
        }));
        // Handle update message event
        socket.on("updateMessage", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, message } = data;
                const updatedMessage = yield message_1.Message.updateMessage(id, message);
                io.emit("updateMessage", updatedMessage);
            }
            catch (error) {
                console.error("Error updating message:", error);
            }
        }));
        // Handle delete message event
        socket.on("deleteMessage", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = data;
                const deletedMessage = yield message_1.Message.deleteMessage(id);
                io.emit("deleteMessage", deletedMessage);
            }
            catch (error) {
                console.error("Error deleting message:", error);
            }
        }));
    });
};
exports.default = chatSocket;
