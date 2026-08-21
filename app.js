require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/events.routes');
const registrationRoutes = require('./routes/registrations.routes');
const announcementRoutes = require('./routes/announcements.routes');

const app = express();

// Middleware Fix for Express 5 & mongoSanitize
app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: { ...req.query },
    writable: true,
    configurable: true,
    enumerable: true
  });
  next();
});

app.use(morgan('dev'));
app.use(express.json());
app.use(mongoSanitize());

// Base Route
app.get('/', (req, res) => {
  res.send('EventPulse API is running...');
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/announcements', announcementRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ status: 'fail', message: 'Route not found' });
});
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    uptime: `${Math.floor(process.uptime())}s`,
    database: dbState
  });
});
// Central Error Handler
app.use(errorHandler);

// تصدير app ليستقبله server.js
module.exports = app;