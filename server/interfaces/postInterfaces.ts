import { Optional } from "sequelize";

export interface IPost {
    id?: number;
    title: string;
    numPeople: number;
    ingredients: string;
    instructions: string;
    imageUrl?: string;
    authorId: number;
}

// Campos opcionales (como ID que se genera automáticamente)
export interface PostCreationAttributes extends Optional<IPost, 'id'> {}