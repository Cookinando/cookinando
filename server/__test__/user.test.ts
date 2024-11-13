import request from 'supertest';
import { app, server } from '../app';
import db from '../database/db';
import User from '../models/userModel';
import { tokenSign } from '../utils/handleJwt';
import bcrypt from 'bcrypt';

let adminToken: string, regularUserToken: string;

beforeAll(async () => {
  await db.sync();

  const hashedPasswordAdmin = await bcrypt.hash('hashedPassword', 10);
  const hashedPasswordUser = await bcrypt.hash('hashedPassword', 10);

  const adminUser = await User.create({
    username: 'adminUser',
    email: 'admin@example.com',
    password: hashedPasswordAdmin,
    role: 'admin',
  });
  adminToken = await tokenSign(adminUser);

  const regularUser = await User.create({
    username: 'regularUser',
    email: 'user@example.com',
    password: hashedPasswordUser,
    role: 'user',
  });
  regularUserToken = await tokenSign(regularUser);
});

afterAll(async () => {
  await db.sync({ force: true });
  await db.close();
  server.close();
});

describe('GET /api/users', () => {
    it('should return 403 if non-admin user tries to access users', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${regularUserToken}`);
      
      console.log('Response body:', response.body);  // Verifica la respuesta
  
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Access denied. Only admins can perform this action');
    });
  
    it('should return 200 and list of users if admin user accesses', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('email');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return 200 and the user if the user exists', async () => {
      const response = await request(app)
        .get('/api/users/1') 
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe(1); 
    });
  
    it('should return 404 if the user does not exist', async () => {
      const response = await request(app)
        .get('/api/users/999') 
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('User not found.');
    });
  });

describe('PUT /api/users/:id', () => {
  it('should return 403 if non-admin user tries to update a user role', async () => {
    const updatedData = {
      username: 'UpdatedUser',
      role: 'admin',
    };

    const response = await request(app)
      .put('/api/users/1') 
      .set('Authorization', `Bearer ${regularUserToken}`)
      .send(updatedData);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Access denied. Only admins can update user role.');
  });

  it('should return 200 and update user if admin updates the user role', async () => {
    const updatedData = {
      username: 'UpdatedUser',
      role: 'admin',
    };

    const response = await request(app)
      .put('/api/users/2') 
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('role', 'admin');
  });
});

describe('DELETE /api/users/:id', () => {
  it('should return 404 if user does not exist', async () => {
    const response = await request(app)
      .delete('/api/users/9999') 
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found.');
  });

  it('should return 200 if user is successfully deleted', async () => {
    const response = await request(app)
      .delete('/api/users/2') 
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User successfully deleted.');
  });
});
