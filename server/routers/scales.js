const { Router } = require("express");
const { getAllScales } = require("../controllers/scales")
const router = Router();

/**
 * @swagger
 * /scales:
 *   get:
 *     tags: [
 *       scales
 *     ]
 *     summary: Returns an array of scales items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[ { "id": 1, "key": "C", "name": "C Major", }, { "id": 2, "key": "D", "name": "D Major", } ]'
 *       404:
 *         description: Scales not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.route("/").get(getAllScales);

module.exports = router;
