import { Model, Column, DataType, Table, HasMany } from "sequelize-typescript";
import { Message } from './message';

@Table({
  tableName: "Conversations",
  timestamps: true,
})
export class Conversations extends Model {
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
  public user1Id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public user2Id!: number;

  @HasMany(() => Message, 'conversationId')
  public messages!: Message[];
}
