const mongoose = require('mongoose');

module.exports = class MongoConnection {
  constructor({ config }) {
    this.config = config;
  }

  async start() {
    await mongoose.connect(this.config.db.uri, {
      retryWrites: true,
      w: 'majority',
      auth: {
        username: this.config.db.auth.username,
        password: this.config.db.auth.password,
      },
      authSource: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}
