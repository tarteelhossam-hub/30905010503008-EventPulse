const Announcement = require('../models/announcement.model');

// 1. Post & Broadcast Announcement (Admin Only)
exports.createAnnouncement = async (req, res, next) => {
  try {
    const { eventId, text } = req.body;
    const senderId = req.user.id;

    // Persist announcement record in MongoDB
    const announcement = await Announcement.create({
      event: eventId,
      sender: senderId,
      text
    });

    // Populate sender details for real-time emission
    await announcement.populate('sender', 'name email');

    // Access Socket.io instance attached to app
    const io = req.app.get('io');
    
    // Broadcast instantly to the specific event room
    io.to(eventId).emit('announcement', announcement);

    res.status(201).json({
      status: 'success',
      data: announcement
    });
  } catch (error) {
    next(error);
  }
};

// 2. Fetch Past Announcements for an Event (Public)
exports.getAnnouncementsByEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const announcements = await Announcement.find({ event: eventId })
      .populate('sender', 'name email')
      .sort({ createdAt: 1 }); // Chronological order (oldest to newest)

    res.status(200).json({
      status: 'success',
      data: announcements
    });
  } catch (error) {
    next(error);
  }
};