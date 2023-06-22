const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const numbersOfFields = Object.keys(req.body).length;
    if (numbersOfFields) {
      const { error } = schema.validate(req.body);
      if (error) {
        const str = error.message;
        const startIndex = str.indexOf('"') + 1;
        const endIndex = str.lastIndexOf('"');
        const field = str.slice(startIndex, endIndex);
        next(HttpError(400, `missing required ${field} field`));
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
