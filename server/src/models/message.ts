import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from './user';
import { Conversations } from './conversations';

@Table
export class Message extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public senderId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public recipientId!: number;

  @ForeignKey(() => Conversations)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public conversationId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public message!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  public timestamp!: Date;

  @BelongsTo(() => User, 'senderId')
  public sender!: User;

  @BelongsTo(() => User, 'recipientId')
  public recipient!: User;

  @BelongsTo(() => Conversations, 'conversationId')
  public conversation!: Conversations;

  static async findById(senderId: number, id: number) {
    const result = await Message.findOne({
      where: { senderId, id },
    });
    return result;
  }

  static async findByUserId(userId: number) {
    const result = await Message.findAll({
      where: { senderId: userId },
    });
    return result;
  }

  static async createMessage(senderId: number, recipientId: number, message: string) {
    const result = await Message.create({
      senderId,
      recipientId,
      message,
      timestamp: new Date(),
    });
    return result;
  }

  static async updateMessage(id: number, message: string) {
    const result = await Message.update(
      { message },
      {
        where: { id },
        returning: true,
      }
    );
    return result[1][0];
  }

  static async deleteMessage(id: number) {
    const message = await Message.findByPk(id);
    if (message) {
      await message.destroy();
    }
    return message;
  }
}