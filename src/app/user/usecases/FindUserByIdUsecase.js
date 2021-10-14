const fileName = 'FindUserByIdUsecase';

module.exports = ({ logger, userRepository }) => ({
  find: async (id) => {
    const callName = `${fileName}.find()`;
    logger.info(`${callName} trying to find user with id: ${id}`);
    const user = await userRepository.findUserById(id);
    logger.info(`${callName} user finded: ${JSON.stringify(user)}`);
    return user;
  },
});
