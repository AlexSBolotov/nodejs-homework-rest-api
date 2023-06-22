const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const numbersOfFields = Object.keys(req.body).length;
    if (numbersOfFields) {
      const { error } = schema.validate(req.body);
      if (error) {
        next(HttpError(400, error.message));
      }
      next();
    } else {
      next(HttpError(400, `missing fields`));
    }
    next();
  };
  return func;
};

module.exports = { validateBody };
