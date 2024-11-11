import request from 'supertest';
import User from '../models/userModel';
import db from '../database/db';
import { app, server } from '../app';

beforeAll(async () => {
  await User.sync();
});

afterEach(async () => {
  await User.destroy({ where: {} });
});

afterAll(async () => {
  await User.sync({ force: true });
  await db.close();
  server.close();
});

