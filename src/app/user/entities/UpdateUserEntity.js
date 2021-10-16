module.exports = (user) => {
  const obj = {
    name: user.name || null,
    document: user.document || null,
    email: user.email || null,
  };
  Object.keys(obj).forEach((u) => {
    if (obj[u] === null) delete obj[u];
  });
  return obj;
};
