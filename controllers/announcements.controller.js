const Announcement = require('../models/announcement.model');

exports.createAnnouncement = async (req, res, next) => {
  try {
    const { eventId, text } = req.body;
    
    const senderId = req.user?.id || req.user?._id || req.body.sender;

    const announcement = await Announcement.create({
      event: eventId,
      sender: senderId,
      text
    });

    await announcement.populate('sender', 'name email');


    const io = req.app.get('io');
    

    io.to(eventId).emit('announcement', announcement);
    io.emit('announcement', announcement);
    res.status(201).json({
      status: 'success',
      data: announcement
    });
  } catch (error) {
    next(error);
  }
};

exports.getAnnouncementsByEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const announcements = await Announcement.find({ event: eventId })
      .populate('sender', 'name email')
      .sort({ createdAt: 1 }); 

    res.status(200).json({
      status: 'success',
      data: announcements
    });
  } catch (error) {
    next(error);
  }
};