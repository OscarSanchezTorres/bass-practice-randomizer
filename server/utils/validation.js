
const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const error = validationResult(req);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(400).json({ error: error.array() });
    } else {
      next();
    }
  }

  const validationUtils = { validate };
  module.exports = validationUtils;