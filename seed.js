require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/user.model');
const Category = require('./models/category.model');
const Event = require('./models/event.model');
const Registration = require('./models/registration.model');
const Message = require('./models/message.model');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected for seeding...');

    await Message.deleteMany();
    await Registration.deleteMany();
    await Event.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
    console.log('Old data cleared successfully.');

    const hashedPassword = await bcrypt.hash('AdminPass123!', 10);
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@eventpulse.com',
      password: hashedPassword,
      role: 'admin'
    });

    const attendeeUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'attendee'
    });
    console.log('Users created.');

    const categories = await Category.insertMany([
      { name: 'Technology', description: 'Tech conferences, hackathons, and workshops'},
      { name: 'Music', description: 'Live concerts and music festivals' },
      { name: 'Sports', description: 'Tournaments and fitness events' }
    ]);
    console.log('Categories created.');

    const events = await Event.insertMany([
      {
        title: 'AI & Web Dev Summit 2026',
        description: 'A comprehensive summit on modern backend & AI architectures.',
        category: categories[0]._id,
        date: new Date('2026-09-15'),
        city: 'Cairo',
        venue: 'Greek Campus',
        capacity: 150,
        organizer: adminUser._id
      },
      {
        title: 'Node.js Masterclass Workshop',
        description: 'Hands-on practical session building scalable microservices.',
        category: categories[0]._id,
        date: new Date('2026-10-01'),
        city: 'Alexandria',
        venue: 'Bibliotheca Alexandrina',
        capacity: 50,
        organizer: adminUser._id
      },
      {
        title: 'Summer Sound Festival',
        description: 'Outdoor musical performances featuring indie bands.',
        category: categories[1]._id,
        date: new Date('2026-08-30'),
        city: 'El Gouna',
        venue: 'Arena Stage',
        capacity: 500,
        organizer: adminUser._id
      },
      {
        title: 'Regional Hackathon 2026',
        description: '48-hour competitive coding and innovation contest.',
        category: categories[2]._id,
        date: new Date('2026-11-20'),
        city: 'Cairo',
        venue: 'Cairo Stadium Complex',
        capacity: 200,
        organizer: adminUser._id
      }
    ]);
    console.log('Events created.');

  
    await Registration.create({
      event: events[0]._id,
      attendee: attendeeUser._id
    });

    console.log('-----------------------------------');
    console.log('Event ID:', events[0]._id);
    console.log('Attendee ID:', attendeeUser._id);
    console.log('-----------------------------------');

    console.log('Seed completed successfully! Database ready.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();