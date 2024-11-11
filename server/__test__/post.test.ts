import request from 'supertest';
import db from '../database/db';
import { app, server } from '../app';
import User from '../models/userModel';
import Post from '../models/postModel';
import { tokenSign } from '../utils/handleJwt';

const newPost = {
  title: "Test Post",
  numPeople: 4,
  ingredients: ["Ingredient 1", "Ingredient 2"],
  instructions: ["Instruction 1", "Instruction 2"],
  imageUrl: "https://example.com/image.jpg",
};

const updatedPost = {
  title: "Updated Post",
  numPeople: 6,
  ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
  instructions: ["Instruction 1", "Instruction 2", "Instruction 3"],
  imageUrl: "https://example.com/updated-image.jpg",
};

let adminToken: string, userToken: string;

beforeAll(async () => {
  await db.sync();

  const adminUser = await User.create({
    username: 'adminUser',
    email: 'admin@example.com',
    password: 'hashedPassword',
    role: 'admin',
  });
  adminToken = await tokenSign(adminUser);

  const regularUser = await User.create({
    username: 'regularUser',
    email: 'user@example.com',
    password: 'hashedPassword',
    role: 'user',
  });
  userToken = await tokenSign(regularUser);
});

afterEach(async () => {
  await Post.destroy({ where: {} });
});

afterAll(async () => {
  await db.sync({ force: true });
  await db.close();
  server.close();
});

describe('Post Controller', () => {
  describe('POST /posts', () => {
    it('should create a new post if the user is an admin', async () => {
      const  response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newPost);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', newPost.title);
    });

    describe('Error Handling create post', () => {
      it('should return a 403 status code if the user is not an admin', async () => {
        const response = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newPost);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', 'Access denied. Only admins can perform this action');
      });

      it('should return a 401 status code if the user is not authenticated', async () => {
        const response = await request(app)
        .post('/api/posts')
        .send(newPost);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Access denied');
      });
    });
  });

  describe('GET /posts/:id', () => {
    it('should return a post by ID', async () => {
      const createdPost = await Post.create({...newPost, authorId: 1, ingredients: JSON.stringify(newPost.ingredients), instructions: JSON.stringify(newPost.instructions)});
  
      const response = await request(app)
      .get(`/api/posts/${createdPost.id}`)
      .set('Authorization', `Bearer ${userToken}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', newPost.title);
    });
  
    describe('Error Handling get post by ID', () => {
      it('should return a 404 status code if the post is not found', async () => {
        const response = await request(app)
        .get('/api/posts/9999')
        .set('Authorization', `Bearer ${userToken}`);
  
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', '❌ Post not found');
      });
    });
  });
  
  describe('PUT /posts/:id', () => {
    it('should update a post if the user is an admin', async () => {
      const createdPost = await Post.create({...newPost, authorId: 1, ingredients: JSON.stringify(newPost.ingredients), instructions: JSON.stringify(newPost.instructions)});
  
      const response = await request(app)
      .put(`/api/posts/${createdPost.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updatedPost);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', '✅ Post updated successfully');
    });

    describe('Error Handling update post', () => {
      it('should return a 403 status code if the user is not an admin', async () => {
        const createdPost = await Post.create({...newPost, authorId: 1, ingredients: JSON.stringify(newPost.ingredients), instructions: JSON.stringify(newPost.instructions)});

        const response = await request(app)
        .put(`/api/posts/${createdPost.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedPost);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', 'Access denied. Only admins can perform this action');
      });

      it('should return a 401 status code if the user is not authenticated', async () => {
        const createdPost = await Post.create({...newPost, authorId: 1, ingredients: JSON.stringify(newPost.ingredients), instructions: JSON.stringify(newPost.instructions)});
        const response = await request(app)
        .put(`/api/posts/${createdPost.id}`)
        .send(updatedPost);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Access denied');
      });
    });
  });

  describe('DELETE /posts/:id', () => {
    it('should delete a post if the user is an admin', async () => {
      const createdPost = await Post.create({...newPost, authorId: 1, ingredients: JSON.stringify(newPost.ingredients), instructions: JSON.stringify(newPost.instructions)});

      const response = await request(app)
      .delete(`/api/posts/${createdPost.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', '✅ Post deleted successfully');
    });

    describe('Error Handling delete post', () => {
      it('should return a 403 status code if the user is not an admin', async () => {
        const createdPost = await Post.create({...newPost, authorId: 1, ingredients: JSON.stringify(newPost.ingredients), instructions: JSON.stringify(newPost.instructions)});

        const response = await request(app)
        .delete(`/api/posts/${createdPost.id}`)
        .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', 'Access denied. Only admins can perform this action');
      });

      it('should return a 404 status code if the post is not found', async () => {
        const response = await request(app)
        .delete('/api/posts/9999')
        .set('Authorization', `Bearer ${adminToken}`);
  
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', '❌ Post not found');
      });
    });
  });
});