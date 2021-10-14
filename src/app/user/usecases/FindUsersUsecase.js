const fileName = 'FindUsersUsecase';

module.exports = ({ logger, userRepository }) => ({
  find: async (pg) => {
    const callName = `${fileName}.find()`;
    logger.info(`${callName} entered with pg: ${pg}`);
    const users = await userRepository.findUsers(pg);
    logger.info(`${callName} returned users: ${JSON.stringify(users)}`);
    return users;
  },
});
