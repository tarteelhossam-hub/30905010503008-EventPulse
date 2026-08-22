const Registration = require('../models/registration.model');
const Event = require('../models/event.model');

// 1. Register for an Event (POST /api/registrations)
exports.registerForEvent = async (req, res, next) => {
  try {
    // Fallback logic to support token payload variability or body input
    const userId = req.user?.id || req.user?._id || req.body.attendee || req.body.attendeeId;
    const eventId = req.body.event || req.body.eventId;

    // Check 1: Event existence
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check 2: Double registration
    const existing = await Registration.findOne({
      event: eventId,
      attendee: userId
    });
    if (existing) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    // Check 3: Capacity check
    const currentCount = await Registration.countDocuments({ event: eventId });
    if (currentCount >= event.capacity) {
      return res.status(400).json({ message: 'This event is full' });
    }

    // Create registration
    const registration = await Registration.create({
      event: eventId,
      attendee: userId
    });

    res.status(201).json(registration);
  } catch (error) {
    next(error);
  }
};

// 2. Get My Registrations (GET /api/registrations/my)
exports.getMyRegistrations = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;

    const registrations = await Registration.find({ attendee: userId }).populate('event');

    res.status(200).json(registrations);
  } catch (error) {
    next(error);
  }
};

// 3. Cancel Registration (DELETE /api/registrations/:id)
exports.cancelRegistration = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const registrationId = req.params.id;

    // Check existence
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Check ownership
    if (registration.attendee.toString() !== userId?.toString()) {
      return res.status(403).json({ message: "You can only cancel your own registration" });
    }

    await registration.deleteOne();

    res.status(200).json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    next(error);
  }
};