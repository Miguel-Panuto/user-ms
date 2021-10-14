const config = require('./config.json');

module.exports = {
  ...config,
  db: {
    uri: process.env.MONGO_CONNECT || config.db.uri,
    auth: {
      username: process.env.MONGO_USER || config.db.auth.username,
      password: process.env.MONGO_PASS || config.db.auth.password,
    },
  },
};