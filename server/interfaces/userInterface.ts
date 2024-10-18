import { Optional, Model } from "sequelize";

interface UserAttributes {
    id: number;
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
  }
  
  interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
  
  export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public isAdmin!: boolean;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }