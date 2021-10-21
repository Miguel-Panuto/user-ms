module.exports = (user) => {
  return {
    id: user._id || null,
    email: user.email || null,
    password: user.password || null,
  };
};
