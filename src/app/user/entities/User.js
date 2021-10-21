module.exports = (user) => {
  const obj = {
    name: user.name || null,
    birthdate: new Date(user.birthdate) || null,
    document: user.document || null,
    email: user.email || null,
    phone: user.phone || null,
  };
  return obj;
};
