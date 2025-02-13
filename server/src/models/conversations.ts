import { Model, Column, DataType, Table } from "sequelize-typescript";

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
}
