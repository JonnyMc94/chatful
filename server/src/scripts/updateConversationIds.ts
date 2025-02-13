import { Message } from "../models/message";
import { Conversations } from "../models/conversations";
import { Op } from "sequelize";
import sequelize from "../sequelize";

const updateMessages = async () => {
await sequelize.sync();
  const messages = await Message.findAll({
    where: { conversationId: null },  // Find messages with no conversationId
  });

  for (const message of messages) {
    const conversation = await Conversations.findOne({
      where: {
        [Op.or]: [
          { user1Id: message.senderId, user2Id: message.recipientId },
          { user1Id: message.recipientId, user2Id: message.senderId },
        ],
      },
    });

    if (conversation) {
      await message.update({ conversationId: conversation.id });
    }
  }
};

updateMessages().then(() => console.log("Messages updated")).catch(console.error);
