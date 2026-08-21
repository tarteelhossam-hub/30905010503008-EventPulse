const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const ctrl = require('../controllers/registrations.controller');
const validate = require('../middleware/validate');
const { registrationValidation } = require('../middleware/validators');
// All routes are protected with requireAuth
router.post('/', requireAuth, ctrl.registerForEvent);
router.get('/my', requireAuth, ctrl.getMyRegistrations);
router.delete('/:id', requireAuth, ctrl.cancelRegistration);
router.post('/', requireAuth, registrationValidation, validate, ctrl.registerForEvent);
module.exports = router;