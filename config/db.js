const mongoose = require('mongoose');

let cachedPromise = null;

const connectDB = async () => {
  // 1. إذا كان الاتصال قائماً بالفعل، ارجع الموديل مباشرة
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // 2. إذا لم يكن هناك Promise جاري تنفيذه، أنشئ اتصالاً جديداً
  if (!cachedPromise) {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI is missing from environment variables');
    }

    cachedPromise = mongoose.connect(mongoUri, {
      bufferCommands: false,
    });
  }

  try {
    await cachedPromise;
    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    cachedPromise = null; // إعادة تعيين الـ Promise في حال الفشل لإتاحة المحاولة لاحقاً
    throw error; // إلقاء الخطأ ليتعامل معه Express Middleware
  }
};

module.exports = connectDB;