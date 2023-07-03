const { Router } = require("express");
const { check, param } = require("express-validator");
const validation = require("../utils/validation");
const { getAllProjects, getProject, getProjectSongs, createProject, updateProject, deleteProject } = require("../controllers/projects")
const router = Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     tags: [
 *       projects
 *     ]
 *     summary: Returns an array of project items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[ { "id": 1, "name": "Project 1", "date_created": "2023-04-20", "user_id": 1 }, { "id": 2, "name": "Project 2", "date_created": "2023-04-21", "user_id": 2 } ]'
 *       404:
 *         description: Users not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.route("/").get(getAllProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     tags: [
 *       projects
 *     ]
 *     summary: Retrieve a single project by their id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "name": "Project A", "date_created": "2022-01-01T00:00:00Z", "user_id": 1 }'
 *       404:
 *         description: Project not found.
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
  getProject,
);

/**
 * @swagger
 * /projects/{id}/songs:
 *   get:
 *     tags: [
 *       projects
 *     ]
 *     summary: Retrieve song of a project by their id
 *     responses:
 *       204:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[ { "id": 1, "name": "Song 1", "artist": "Artist 1", "album": "Album 1" }, { "id": 2, "name": "Song 2", "artist": "Artist 2", "album": "Album 2" } ]'
 *       404:
 *         description: Project not found.
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
router.route("/:id/songs").get(
  [
    param("id") //id
      .isNumeric()
      .withMessage("User ID must be numeric")
      .trim(),
  ],
  validation.validate,
  getProjectSongs,
);

/**
 * @swagger
 *
 * /projects:
 *   post:
 *     tags: [
 *       projects
 *     ]
 *     summary: Creates a new project
 *     requestBody:
 *       description: Project object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "name": "Project 1", "user_id": 1 }'
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
      .withMessage("The name is required")
      .trim(),
    check("name")
      .isLength({ max: 50 })
      .withMessage("The name must be less than 50 characters")
      .trim(),
    check("name")
      .isLength({ min: 2 })
      .withMessage("The name must have minimum length of 2")
      .trim(),
    check("user_id") //user_id
      .notEmpty()
      .withMessage("user_id is required")
      .trim(),
    check("user_id").isNumeric().withMessage("user_id must be numeric").trim(),
  ],
  validation.validate,
  createProject,
);

/**
 * @swagger
 *
 * /projects/{id}:
 *   put:
 *     tags: [
 *       projects
 *     ]
 *     summary: Updates a project
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Project ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Project object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "name": "Project 1", "date_created": "2023-05-09T00:00:00.000Z", "user_id": 1 }'
 *       404:
 *         description: Ptoject not found.
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
      .withMessage("The name is required")
      .trim(),
    check("name")
      .isLength({ max: 50 })
      .withMessage("The name must be less than 50 characters")
      .trim(),
    check("name")
      .isLength({ min: 2 })
      .withMessage("The name must have minimum length of 2")
      .trim(),
    check("user_id") //user_id
      .notEmpty()
      .withMessage("user_id is required")
      .trim(),
    check("user_id").isNumeric().withMessage("user_id must be numeric").trim(),
  ],
  validation.validate,
  updateProject,
);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     tags: [
 *       projects
 *     ]
 *     summary: Delete a project by ID
 *     description: Deletes a project by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the project to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       204:
 *         description: Project deleted successfully.
 *       404:
 *         description: Project not found.
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
  deleteProject
);

module.exports = router;
