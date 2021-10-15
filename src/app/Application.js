const container = require('src/container');

module.exports = class Application {
  constructor() {
    this.container = container;
  }

  async start() {
    const { server, amqpClient, amqpChannels, mongoConnection } =
      this.container.cradle;

    await server.start();
    await amqpClient.start();
    await amqpChannels.createExchanges();
    await mongoConnection.start();
  }
};
