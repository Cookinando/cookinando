import { Optional } from "sequelize";

export interface IPost {
    id?: number;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
    // authorId: number;
}

// Campos opcionales (como ID que se genera automáticamente)
export interface PostCreationAttributes extends Optional<IPost, 'id' | 'createdAt' | 'updatedAt'> {}