import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user';

console.log('Initializing Message model');

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
  public userId!: number;

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

  @BelongsTo(() => User)
  public user!: User;

  static async findById(userId: number, id: number) {
    const result = await Message.findOne({
      where: { userId, id },
    });
    return result;
  }

  static async findByUserId(userId: number) {
    const result = await Message.findAll({
      where: { userId },
    });
    return result;
  }

  static async createMessage(userId: number, message: string) {
    const result = await Message.create({
      userId,
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