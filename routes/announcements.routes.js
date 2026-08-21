const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const ctrl = require('../controllers/announcements.controller');

// Broadcast Announcement (Admin only)
router.post('/', requireAuth, requireRole('admin'), ctrl.createAnnouncement);

// Get Announcement History (Public)
router.get('/:eventId', ctrl.getAnnouncementsByEvent);

module.exports = router;