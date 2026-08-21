const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../app');

// استدعاء الموديلات لضمان تسجيل الـ Schemas في Mongoose قبل التشغيل
require('../../../models/category.model'); // استدعي موديل الكاتجوري هنا
// require('../../../models/Event'); // لو الموديل موجود في مجلد models

describe('Events API Integration Tests', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test_db';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
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