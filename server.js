require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const app = require('./app');

// 2. Create HTTP Server Wrapper
const server = http.createServer(app);

// 3. Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// 4. Attach io instance to Express App
app.set('io', io);

// 5. Socket.io Connection & Event Rooms
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-event', (eventId) => {
    socket.join(eventId);
    console.log(`Socket ${socket.id} joined room: ${eventId}`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// 1 & 6. Connect Database Then Start Server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server due to DB connection:', err);
});