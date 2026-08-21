const Event = require('../models/event.model');

// 1. Get All Events (Filtering, Pagination, Sorting, Search)
exports.getEvents = async (req, res, next) => {
  try {
    const { category, city, startDate, endDate, page, limit, sortBy, order, search } = req.query;

    // --- A. Filtering ---
    const filter = {};

    if (category) filter.category = category;
    if (city) filter.city = city;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // --- B. Text Search ($regex) ---
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // --- C. Pagination ---
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    // --- D. Sorting ---
    const allowedSortFields = ['date', 'registrations'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'date';
    const sortDirection = order === 'desc' ? -1 : 1;
    const sort = { [sortField]: sortDirection };

    // Execute Queries concurrently
    const [data, total] = await Promise.all([
      Event.find(filter)
        .populate('category')
        .sort(sort)
        .skip(skip)
        .limit(limitNum),
      Event.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      status: 'success',
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      data
    });
  } catch (error) {
    next(error);
  }
};

// 2. Get Single Event by ID
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('category')
      .populate('organizer');

    if (!event) {
      return res.status(404).json({
        status: 'fail',
        message: 'Event not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: event
    });
  } catch (error) {
    next(error);
  }
};

// 3. Create Event (Admin)
exports.createEvent = async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newEvent
    });
  } catch (error) {
    next(error);
  }
};

// 4. Update Event (Admin)
exports.updateEvent = async (req, res, next) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedEvent) {
      return res.status(404).json({
        status: 'fail',
        message: 'Event not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: updatedEvent
    });
  } catch (error) {
    next(error);
  }
};

// 5. Delete Event (Admin)
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        status: 'fail',
        message: 'Event not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};