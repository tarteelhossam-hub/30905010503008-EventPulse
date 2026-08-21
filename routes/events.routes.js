const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const ctrl = require('../controllers/events.controller');
const validate = require('../middleware/validate');
const { createEventValidation, updateEventValidation } = require('../middleware/validators');

// Read Endpoints (Public)
router.get('/', ctrl.getEvents);
router.get('/:id', ctrl.getEventById);

// Write Endpoints (Admin Only)
router.post('/', requireAuth, requireRole('admin'), ctrl.createEvent);
router.patch('/:id', requireAuth, requireRole('admin'), ctrl.updateEvent);
router.delete('/:id', requireAuth, requireRole('admin'), ctrl.deleteEvent);
router.post("/", requireAuth, requireRole('admin'), createEventValidation, validate, ctrl.createEvent);
router.patch("/:id", requireAuth, requireRole('admin'), updateEventValidation, validate, ctrl.updateEvent);
module.exports = router;