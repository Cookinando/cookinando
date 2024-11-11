import request from 'supertest';
import User from '../models/userModel';
import db from '../database/db';
import { app, server } from '../app';

jest.mock('../utils/handlePassword', () => ({
  encrypt: jest.fn().mockResolvedValue("mockedEncryptedPassword"),
  compare: jest.fn((plain, hashed) => plain === "correctPassword" && hashed === "mockedEncryptedPassword")
}));

jest.mock('../utils/handleJwt', () => ({
  tokenSign: jest.fn().mockResolvedValue("mockedJwtToken")
}));


beforeAll(async () => {
  await db.sync();
});

afterEach(async () => {
  await User.destroy({ where: {} });
});

afterAll(async () => {
  await db.sync({ force: true });
  await db.close();
  server.close();
});

describe('Auth Controller', () => {
  describe('POST /signup', () => {
    it('should register a new user and return a token', async () => {
      const newUser = {
        username: 'testUser',
        email: 'test@example.com',
        password: 'testpassword',
        role: 'user',
      };

      const response = await request(app).post('/api/users/signup').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', '✅ User created successfully');
      expect(response.body).toHaveProperty('token', "mockedJwtToken");
      
      const user = await User.findOne({ where: { username: newUser.username, email: newUser.email } });

      expect(user).not.toBeNull();
      expect(user?.username).toBe(newUser.username);
      expect(user?.email).toBe(newUser.email);
    });

    describe('Error Handling signup', () => {
      it('should return a 409 status code if the username is already in use', async () => {
        const existingUser = {
          username: 'testUser',
          email: 'test@example.com',
          password: 'testpassword',
          role: 'user',
        };
        await User.create(existingUser);
  
        const newUser = {
          username: 'testUser',
          email: 'newemail@example.com',
          password: 'newpassword',
          role: 'user',
        };
  
        const response = await request(app).post('/api/users/signup').send(newUser);
  
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('message', 'Name already in use');
      });
      
      it('should return a 400 status code if the email is already in use', async () => {
        const existingUser = {
          username: 'testUser',
          email: 'test@example.com',
          password: 'testpassword',
          role: 'user',
        };
        await User.create(existingUser);
        
        const newUser = {
          username: 'newUser',
          email: 'test@example.com',
          password: 'newpassword',
          role: 'user',
        };
  
        const response = await request(app).post('/api/users/signup').send(newUser);
  
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('🚨Este email ya está en uso🚨');
      });
    });
  });

  describe('POST /login', () => {
    it('should log in a user and return a token', async () => {
      const existingUser = {
        username: 'testUser',
        email: 'test@example.com',
        password: 'mockedEncryptedPassword',
        role: 'user',
      };
      await User.create(existingUser);


      const response = await request(app).post('/api/users/login').send({
        email: 'test@example.com',
        password: 'correctPassword',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('sessionData');
      expect(response.body.sessionData).toHaveProperty("token", "mockedJwtToken");
    });

    describe('Error Handling login', () => {
      it('should return a 400 status code if the user is not found', async () => {
        const response = await request(app).post('/api/users/login').send({
          email: 'nonexistent@example.com',
          password: 'password',
        });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0].msg).toBe('🚨El usuario no existe🚨');
      });
  
      it('should return a 400 status code if the password is incorrect', async () => {
        const existingUser = {
          username: 'testUser',
          email: 'test@example.com',
          password: 'mockedEncryptedPassword',
          role: 'user',
        };
        await User.create(existingUser);
  
        const response = await request(app).post('/api/users/login').send({
          email: 'test@example.com',
          password: 'incorrectPassword',
        });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', '❌ PASSWORD_INVALID');
      });
    });
  });
})