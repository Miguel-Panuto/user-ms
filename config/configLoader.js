const config = require('./config.json');

module.exports = {
  ...config,
  amqp: {
    ...config.amqp,
    uri: process.env.AMQP_URI || config.amqp.uri,
  },
  db: {
    uri: process.env.MONGO_CONNECT || config.db.uri,
    auth: {
      username: process.env.MONGO_USER || config.db.auth.username,
      password: process.env.MONGO_PASS || config.db.auth.password,
    },
  },
};
