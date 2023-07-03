const { Router } = require("express");
const router = Router();
const validationUtils = require("../utils/validation");
const { check } = require("express-validator");
const authenticationController = require("../controllers/authentication");

/**
 * @swagger
 * /authentication:
 *   post:
 *     tags: [
 *       authentication
 *     ]
 *     summary: Authenticates a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password of the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       200:
 *         description: User Authenticated
 */

router
  .route("/")
  .post(
    [
      check("email")
        .isEmail()
        .withMessage("email is required")
        .trim(),
      check("password")
        .isLength({ min: 6, max: 15 })
        .withMessage(
          "your password should have min and max length between 8-15"
        )
    ],
    validationUtils.validate,
    authenticationController.authenticate
  );

module.exports = router;