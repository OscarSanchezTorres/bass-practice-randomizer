const { Router } = require("express");
const { getAllTechniques } = require("../controllers/techniques")
const router = Router();

/**
 * @swagger
 * /techniques:
 *   get:
 *     tags: [
 *       techniques
 *     ]
 *     summary: Returns an array of techniques items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[ { "id": 1, "complexity": "Beginner", "name": "Fingering", }, { "id": 2, "complexity": "Beginner", "name": "Picking", } ]'
 *       404:
 *         description: Techniques not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.route("/").get(getAllTechniques);

module.exports = router;
