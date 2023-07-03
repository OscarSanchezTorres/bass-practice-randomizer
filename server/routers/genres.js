const { Router } = require("express");
const { getAllGenres } = require("../controllers/genres")
const router = Router();

/**
 * @swagger
 * /genres:
 *   get:
 *     tags: [
 *       genres
 *     ]
 *     summary: Returns an array of genres items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[ { "id": 1, "name": "Rock", }, { "id": 2, "name": "Metal", } ]'
 *       404:
 *         description: Genres not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.route("/").get(getAllGenres);

module.exports = router;
