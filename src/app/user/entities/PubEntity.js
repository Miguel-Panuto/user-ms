module.exports = (user, type) => {
  const obj = {
    event_type: type,
    user,
  };
  return obj;
};
