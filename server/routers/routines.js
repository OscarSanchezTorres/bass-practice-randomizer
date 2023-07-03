const { Router } = require("express");
const { check, param } = require("express-validator");
const validation = require("../utils/validation");
const { getAllRoutines, getRoutine, createRoutine, updateRoutine, deleteRoutine } = require("../controllers/routines");
const router = Router();

/**
 * @swagger
 * /routines:
 *   get:
 *     tags: [
 *       routines
 *     ]
 *     summary: Returns an array of routine items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "name": "Routine 1", "description": "Fingering routine", "project_id": 1, "technique_id": 1, "scale_id": 1, "user_id": 1 }'
 *       404:
 *         description: Routines not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.route("/").get(getAllRoutines);

/**
 * @swagger
 * /routines/{id}:
 *   get:
 *     tags: [
 *       routines
 *     ]
 *     summary: Retrieve a single routine by their id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "name": "Routine 2", "description": "Picking routine", "project_id": 2, "technique_id": 2, "scale_id": 1, "user_id": 1 }'
 *       404:
 *         description: Routine not found.
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
    getRoutine,
);

/**
 * @swagger
 *
 * /routines:
 *   post:
 *     tags: [
 *       routines
 *     ]
 *     summary: Creates a new routine
 *     requestBody:
 *       description: Routine object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               project_id:
 *                 type: integer
 *               technique_id:
 *                 type: integer
 *               scale_id:
 *                 type: integer
 * 
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "name": "Routine 2", "description": "Picking routine", "project_id": 2, "technique_id": 2, "scale_id": 1,, "user_id": 1 }'
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
      check("description") //description
      .notEmpty()
      .withMessage("The description is required")
      .trim(),
    check("description")
      .isLength({ max: 100 })
      .withMessage("The description must be less than 50 characters")
      .trim(),
    check("description")
      .isLength({ min: 2 })
      .withMessage("The description must have minimum length of 2")
      .trim(),
    check("project_id") //project_id
      .notEmpty()
      .withMessage("project_id is required")
      .trim(),
    check("project_id")
    .isNumeric()
    .withMessage("project_id must be numeric")
    .trim(),
    check("technique_id") //technique_id
      .notEmpty()
      .withMessage("technique_id is required")
      .trim(),
    check("technique_id")
    .isNumeric()
    .withMessage("technique_id must be numeric")
    .trim(),
    check("scale_id") //scale_id
      .notEmpty()
      .withMessage("scale_id is required")
      .trim(),
    check("scale_id")
    .isNumeric()
    .withMessage("scale_id must be numeric")
    .trim(),
  ],
  validation.validate,
  createRoutine,
);

/**
 * @swagger
 *
 * /routines/{id}:
 *   put:
 *     tags: [
 *       routines
 *     ]
 *     summary: Updates a routine
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Routine ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Routine object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               project_id:
 *                 type: integer
 *               technique_id:
 *                 type: integer
 *               scale_id:
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
 *                 value: '{ "name": "Routine 2", "description": "Picking routine", "project_id": 2, "technique_id": 2, "scale_id": 1, "user_id": 1 }'
 *       404:
 *         description: Routine not found.
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
      check("description") //description
      .notEmpty()
      .withMessage("The description is required")
      .trim(),
    check("description")
      .isLength({ max: 100 })
      .withMessage("The description must be less than 50 characters")
      .trim(),
    check("description")
      .isLength({ min: 2 })
      .withMessage("The description must have minimum length of 2")
      .trim(),
    check("project_id") //project_id
      .notEmpty()
      .withMessage("project_id is required")
      .trim(),
    check("project_id")
    .isNumeric()
    .withMessage("project_id must be numeric")
    .trim(),
    check("technique_id") //technique_id
      .notEmpty()
      .withMessage("technique_id is required")
      .trim(),
    check("technique_id")
    .isNumeric()
    .withMessage("technique_id must be numeric")
    .trim(),
    check("scale_id") //scale_id
      .notEmpty()
      .withMessage("scale_id is required")
      .trim(),
    check("scale_id")
    .isNumeric()
    .withMessage("scale_id must be numeric")
    .trim(),
  ],
  validation.validate,
  updateRoutine,
);

/**
 * @swagger
 * /routines/{id}:
 *   delete:
 *     tags: [
 *       routines
 *     ]
 *     summary: Delete a routine by ID
 *     description: Deletes a routine by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the routine to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       204:
 *         description: Routine deleted successfully.
 *       404:
 *         description: Routine not found.
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
  deleteRoutine,
);

module.exports = router;
