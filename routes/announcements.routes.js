const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const ctrl = require('../controllers/announcements.controller');

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Event announcement management
 */

/**
 * @swagger
 * /api/announcements:
 *   post:
 *     summary: Broadcast a new announcement (Admin only)
 *     tags: [Announcements]
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
 *               - title
 *               - message
 *             properties:
 *               eventId:
 *                 type: string
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Announcement created and broadcasted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Requires Admin role)
 */
router.post('/', requireAuth, requireRole('admin'), ctrl.createAnnouncement);

/**
 * @swagger
 * /api/announcements/{eventId}:
 *   get:
 *     summary: Get announcement history for a specific event
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID to get announcements for
 *     responses:
 *       200:
 *         description: List of announcements retrieved successfully
 *       404:
 *         description: Event or announcements not found
 */
router.get('/:eventId', ctrl.getAnnouncementsByEvent);

module.exports = router;