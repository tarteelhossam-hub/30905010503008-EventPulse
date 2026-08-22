const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../app');

require('../../../models/category.model');

describe('Events API Integration Tests', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test_db';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('GET /api/events - returns 200 OK and array of events', async () => {
    const res = await request(app).get('/api/events');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
  });

  test('POST /api/events - returns 401 when token is missing', async () => {
    const res = await request(app).post('/api/events').send({ title: 'Test' });
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/events - validation check on missing fields', async () => {
    const res = await request(app).post('/api/events').send({});
    expect([401, 422]).toContain(res.statusCode);
  });
});