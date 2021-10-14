module.exports = ({ pubSub, messageController }) => ({
  initiateRoutes: async () => {
    await pubSub.subscribe('userChange', messageController.onUserChange);
  },
});
