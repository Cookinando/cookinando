import dotenv from "dotenv";
dotenv.config();

export const DB_NAME_DEV: string | undefined = process.env.DB_NAME;
export const DB_NAME_TEST: string | undefined = process.env.DB_NAME_TEST;
export const DB_USER: string | undefined = process.env.DB_USER;
export const DB_PASS: string | undefined = process.env.DB_PASS;
export const PORT: number = 8000;
export const NODE_ENV: string | undefined = process.env.NODE_ENV;

if (!DB_NAME_DEV || !DB_NAME_TEST || !DB_USER || !DB_PASS || !NODE_ENV) {
  throw new Error("One or more environment variables are missing");
}
