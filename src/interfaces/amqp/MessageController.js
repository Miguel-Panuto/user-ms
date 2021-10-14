const fileName = 'MessageController';

module.exports = ({ logger }) => ({
  onUserChange: async (msg) => {
    const callName = `${fileName}.onUserChange()`;
    logger.info(`${callName} entered, with payload: ${JSON.stringify(msg)}`);
  },
});
