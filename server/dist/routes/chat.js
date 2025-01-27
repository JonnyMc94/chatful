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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = require("../models/message");
const router = express_1.default.Router();
router.get("/message/:userID/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userID);
    const messageId = Number(req.params.id);
    try {
        const message = yield message_1.Message.findOne({ where: { userId, id: messageId } });
        res.json(message);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}));
router.get("/messages/:userID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userID);
    try {
        const messages = yield message_1.Message.findAll({ where: { userId } });
        res.json(messages);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}));
router.post("/message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMessage = yield message_1.Message.create({ userId: req.body.user_id, message: req.body.message });
        const io = req.app.get("socketio");
        io.emit("newMessage", newMessage);
        res.json(newMessage);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}));
router.put("/message/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updatedCount, updatedMessages] = yield message_1.Message.update({ message: req.body.message }, { where: { id: Number(req.params.id) }, returning: true });
        const updatedMessage = updatedMessages[0];
        const io = req.app.get("socketio");
        io.emit("updateMessage", updatedMessage);
        res.json(updatedMessage);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}));
router.delete("/message/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedMessage = yield message_1.Message.destroy({ where: { id: Number(req.params.id) } });
        const io = req.app.get("socketio");
        io.emit("deleteMessage", { id: Number(req.params.id) });
        res.json({ id: Number(req.params.id) });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}));
exports.default = router;
