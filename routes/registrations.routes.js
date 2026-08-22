const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const ctrl = require('../controllers/registrations.controller');
const validate = require('../middleware/validate');
const { registrationValidation } = require('../middleware/validators');

/**
 * @swagger
 * tags:
 *   name: Registrations
 *   description: Event registration management
 */

/**
 * @swagger
 * /api/registrations:
 *   post:
 *     summary: Register for an event
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: ID of the event to register for
 *     responses:
 *       201:
 *         description: Registered successfully
 *       400:
 *         description: Already registered or invalid event ID
 *       401:
 *         description: Unauthorized
 */
router.post('/', requireAuth, registrationValidation, validate, ctrl.registerForEvent);

/**
 * @swagger
 * /api/registrations/my:
 *   get:
 *     summary: Get all registrations for the logged-in user
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user registrations retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/my', requireAuth, ctrl.getMyRegistrations);

/**
 * @swagger
 * /api/registrations/{id}:
 *   delete:
 *     summary: Cancel an event registration
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Registration ID
 *     responses:
 *       200:
 *         description: Registration cancelled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Registration not found
 */
router.delete('/:id', requireAuth, ctrl.cancelRegistration);

module.exports = router;