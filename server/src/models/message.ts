import { Table, Column, Model, DataType } from 'sequelize-typescript';
import sequelize from '../sequelize'; // Import the Sequelize instance
import { User } from './user';

@Table
class Message extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

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

Message.belongsTo(User, { foreignKey: 'userId' });

export default Message;