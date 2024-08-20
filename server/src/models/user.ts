import { Table, Column, Model, DataType, BeforeCreate } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { CreationOptional } from 'sequelize';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: CreationOptional<number>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @BeforeCreate
  static async hashPassword(user: User): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}