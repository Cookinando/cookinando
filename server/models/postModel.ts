import { DataTypes, ForeignKey, Model } from 'sequelize';
import db from '../database/db';
import { IPost, PostCreationAttributes } from '../interfaces/postInterfaces';
// import User from './userModel';

class Post extends Model<IPost, PostCreationAttributes> {
  public readonly id!: number;
  public title!: string;
  public numPeople!: number;
  public ingredients!: string;
  public instructions!: string;
  public imageUrl?: string;
  public readonly createdAt!: Date;
  public updatedAt!: Date;
  // public readonly authorId!: ForeignKey<number>; // Relación con User
}

// Inicializar el modelo
Post.init(
  {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numPeople: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // authorId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
      sequelize: db,
      modelName: 'Post',
      tableName: 'posts',
      timestamps: true, // createdAt y updatedAt se manejan automáticamente
  }
);

// Relación con User
// Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

export default Post;