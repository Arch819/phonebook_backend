const validationBody = (schema) => {
  const func = (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      res.status(400).json({ message: result.error.message });
      return;
    }
    next();
  };
  return func;
};
module.exports = validationBody;
