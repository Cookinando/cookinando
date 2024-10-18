import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/db';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public isAdmin!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
);

export default User;
