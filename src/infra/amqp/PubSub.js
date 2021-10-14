const fileName = 'PubSub';

const _createMessage = (message) =>
  Buffer.from(JSON.stringify(message));

module.exports = ({
  logger,
  amqpClient,
  config: {
    amqp: { subs },
  },
}) => ({
  subscribe: async (topicName, callBack) => {
    const channel = await amqpClient.getChannel();
    const q = await channel.assertQueue('');
    const topicEvent = subs.find(
      (sub) => sub.topicName === topicName
    )?.topicEvent;
    if (!topicEvent) throw new Error('No event found');
    await channel.bindQueue(q.queue, topicEvent, '');
    await channel.consume(
      q.queue,
      async (msg) => {
        if (!msg?.content) throw new Error('message has no content');
        const content = msg.content.toString();
        callBack(JSON.parse(content));
      },
      { noAck: false }
    );
  },

  publish: async (exchange, message) => {
    const callName = `${fileName}.publish()`;
    const channel = await amqpClient.getChannel();
    logger.info(`${callName} - Publishing in exchange the message`, message);
    return channel.publish(exchange, '', _createMessage(message));
  },
});
