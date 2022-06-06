// validate title
exports.validateTitle = (title) => {
  const regEx = /^[a-zA-Z0-9\s]+$/;
  return regEx.test(title);
};
