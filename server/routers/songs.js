const { Router } = require("express");
const { check, param } = require("express-validator");
const validation = require("../utils/validation");
const { getAllSongs, getSong, createSong, updateSong, deleteSong } = require("../controllers/songs")
const router = Router();

/**
 * @swagger
 * /songs:
 *   get:
 *     tags: [
 *       songs
 *     ]
 *     summary: Returns an array of song items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[ { "id": 1, "name": "Song 1", "artist": "Artist 1", "album": "Album 1" }, { "id": 2, "name": "Song 2", "artist": "Artist 2", "album": "Album 2" } ]'
 *       404:
 *         description: Songs not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.route("/").get(getAllSongs);

/**
 * @swagger
 * /songs/{id}:
 *   get:
 *     tags: [
 *       songs
 *     ]
 *     summary: Retrieve a single song by their id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "name": "Song 1", "artist": "Artist 1", "album": "Album 1" }'
 *       404:
 *         description: Song not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         description: The type of error.
 *                       value:
 *                         type: string
 *                         description: The invalid value causing the error.
 *                       msg:
 *                         type: string
 *                         description: The error message.
 *                       path:
 *                         type: string
 *                         description: The field or parameter causing the error.
 *                       location:
 *                         type: string
 *                         description: The location of the error (e.g., "params").
 */
router.route("/:id").get(
  [
    param("id") //id
      .isNumeric()
      .withMessage("User ID must be numeric")
      .trim(),
  ],
    validation.validate,
    getSong,
);

/**
 * @swagger
 *
 * /songs:
 *   post:
 *     tags: [
 *       songs
 *     ]
 *     summary: Creates a new song
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               artist:
 *                 type: string
 *               album:
 *                 type: string
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "name": "Song 1", "artist": "Artist 1", "album": "Album 1" }'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         description: The type of error.
 *                       value:
 *                         type: string
 *                         description: The invalid value causing the error.
 *                       msg:
 *                         type: string
 *                         description: The error message.
 *                       path:
 *                         type: string
 *                         description: The field or parameter causing the error.
 *                       location:
 *                         type: string
 *                         description: The location of the error (e.g., "body").
 */
router.route("/").post(
  [
    check("name") //name
      .notEmpty()
      .withMessage("The name required")
      .trim(),
    check("name")
      .isLength({ max: 50 })
      .withMessage("The name must be less than 50 characters")
      .trim(),
    check("name")
      .isLength({ min: 2 })
      .withMessage("The name must have minimum length of 2")
      .trim(),
    check("artist") //artist
      .notEmpty()
      .withMessage("The artist is required")
      .trim(),
    check("artist")
      .isLength({ max: 50 })
      .withMessage("The artist must be less than 50 characters")
      .trim(),
    check("artist")
      .isLength({ min: 2 })
      .withMessage("The artist must have minimum length of 2")
      .trim(),
    check("album") //album
      .notEmpty()
      .withMessage("The album is required")
      .trim(),
    check("album")
      .isLength({ max: 50 })
      .withMessage("The album must be less than 50 characters")
      .trim(),
    check("album")
      .isLength({ min: 2 })
      .withMessage("The album must have minimum length of 2")
      .trim(),
    check("key") //key
      .notEmpty()
      .withMessage("The key is required")
      .trim(),
    check("key")
      .isLength({ max: 50 })
      .withMessage("The key must be less than 50 characters")
      .trim(),
    check("key")
      .isLength({ min: 2 })
      .withMessage("The key must have minimum length of 2")
      .trim(),
  ],
  validation.validate,
  createSong,
);

/**
 * @swagger
 *
 * /songs/{id}:
 *   put:
 *     tags: [
 *       songs
 *     ]
 *     summary: Updates a song
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               artist:
 *                 type: string
 *               album:
 *                 type: string
 *     responses:
 *       responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "name": "Song 1", "artist": "Artist 1", "album": "Album 1" }'
 *       404:
 *         description: Song not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         description: The type of error.
 *                       value:
 *                         type: string
 *                         description: The invalid value causing the error.
 *                       msg:
 *                         type: string
 *                         description: The error message.
 *                       path:
 *                         type: string
 *                         description: The field or parameter causing the error.
 *                       location:
 *                         type: string
 *                         description: The location of the error (e.g., "body").
 */
router.route("/:id").put(
  [
    param("id") //id
      .isNumeric()
      .withMessage("User ID must be numeric")
      .trim(),
      check("name") //name
      .notEmpty()
      .withMessage("The name required")
      .trim(),
    check("name")
      .isLength({ max: 50 })
      .withMessage("The name must be less than 50 characters")
      .trim(),
    check("name")
      .isLength({ min: 2 })
      .withMessage("The name must have minimum length of 2")
      .trim(),
    check("artist") //artist
      .notEmpty()
      .withMessage("The artist is required")
      .trim(),
    check("artist")
      .isLength({ max: 50 })
      .withMessage("The artist must be less than 50 characters")
      .trim(),
    check("artist")
      .isLength({ min: 2 })
      .withMessage("The artist must have minimum length of 2")
      .trim(),
    check("album") //album
      .notEmpty()
      .withMessage("The album is required")
      .trim(),
    check("album")
      .isLength({ max: 50 })
      .withMessage("The album must be less than 50 characters")
      .trim(),
    check("album")
      .isLength({ min: 2 })
      .withMessage("The album must have minimum length of 2")
      .trim(),
  ],
  validation.validate,
  updateSong,
);

/**
 * @swagger
 * /songs/{id}:
 *   delete:
 *     tags: [
 *       songs
 *     ]
 *     summary: Delete a song by ID
 *     description: Deletes a song by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the song to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       204:
 *         description: Song deleted successfully.
*       404:
 *         description: Song not found.
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         description: The type of error.
 *                       value:
 *                         type: string
 *                         description: The invalid value causing the error.
 *                       msg:
 *                         type: string
 *                         description: The error message.
 *                       path:
 *                         type: string
 *                         description: The field or parameter causing the error.
 *                       location:
 *                         type: string
 *                         description: The location of the error (e.g., "params").
 */
router.route("/:id").delete(
  [
    check("id") //id
      .isNumeric()
      .withMessage("User ID must be numeric")
      .trim(),
  ],
  validation.validate,
  deleteSong,
);

module.exports = router;
