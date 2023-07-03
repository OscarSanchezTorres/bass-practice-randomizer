const { Router } = require("express");
const { check, param } = require("express-validator");
const validation = require("../utils/validation");
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/users")
const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of user items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"id": 1,"first_name": "John","second_name": "Doe","email": "johndoe@example.com",},{"id": 2,"first_name": "Jane","second_name": "Doe","email": "janedoe@example.com",}]'
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
router.route("/").get(getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Retrieve a single user by their id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{"id": 1,"first_name": "John","second_name": "Doe","email": "johndoe@example.com","projects": [{"id": 1,"name": "Project 1","date_created": "2023-04-20","routines": [{"id": 1,"name": "Routine 1","description": "Fingering routine","technique_id": 1"scale_id": 1}]},]}'
 *       404:
 *         description: User not found.
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
  getUser,
);

/**
 * @swagger
 *
 * /users:
 *   post:
 *     tags: [
 *       users
 *     ]
 *     summary: Creates a new user
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               second_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 3, "first_name": "John", "second_name": "Doe", "email": "johndoe@example.com", }'
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
    check("first_name") //first name
      .notEmpty()
      .withMessage("The first is required")
      .trim(),
    check("first_name")
      .isLength({ max: 50 })
      .withMessage("The first name must be less than 50 characters")
      .trim(),
    check("first_name")
      .isLength({ min: 2 })
      .withMessage("The first name must have minimum length of 2")
      .trim(),
    check("second_name") //second name
      .notEmpty()
      .withMessage("The second is required")
      .trim(),
    check("second_name")
      .isLength({ max: 50 })
      .withMessage("The second name must be less than 50 characters")
      .trim(),
    check("second_name")
      .isLength({ min: 2 })
      .withMessage("The second name must have minimum length of 2")
      .trim(),
    check("email") //email
      .notEmpty()
      .withMessage("The email is required")
      .trim(),
    check("email").isEmail().withMessage("The email is invalid").trim(),
    check("password") //password
      .notEmpty()
      .withMessage("The password is required")
      .trim(),
    check("password")
      .isLength({ min: 8, max: 16 })
      .withMessage("The password must be between 8 and 16 characters")
      .trim(),
  ],
  validation.validate,
  createUser,
);

/**
 * @swagger
 *
 * /users/{id}:
 *   put:
 *     tags: [
 *       users
 *     ]
 *     summary: Updates a user
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
 *               first_name:
 *                 type: string
 *               second_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
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
 *                 value: '{ "first_name": "Jane", "second_name": "Doe", "email": "janedoe@example.com", "password": "********" }'
 *       404:
 *         description: User not found.
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
    check("first_name") //first name
      .notEmpty()
      .withMessage("The first name is required")
      .trim(),
    check("first_name")
      .isLength({ max: 50 })
      .withMessage("The first name must be less than 50 characters")
      .trim(),
    check("first_name")
      .isLength({ min: 2 })
      .withMessage("The first name must have minimum length of 2")
      .trim(),
    check("second_name") //second name
      .notEmpty()
      .withMessage("The second is required")
      .trim(),
    check("second_name")
      .isLength({ max: 50 })
      .withMessage("The second name must be less than 50 characters")
      .trim(),
    check("second_name")
      .isLength({ min: 2 })
      .withMessage("The second name must have minimum length of 2")
      .trim(),
    check("email") //email
      .notEmpty()
      .withMessage("The email is required")
      .trim(),
    check("email").isEmail().withMessage("The email is invalid").trim(),
    check("password") //password
      .notEmpty()
      .withMessage("The password is required")
      .trim(),
    check("password")
      .isLength({ min: 8, max: 16 })
      .withMessage("The password must be between 8 and 16 characters")
      .trim(),
  ],
  validation.validate,
  updateUser,
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [
 *       users
 *     ]
 *     summary: Delete a user by ID
 *     description: Deletes a user by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
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
  deleteUser,
);

module.exports = router;
