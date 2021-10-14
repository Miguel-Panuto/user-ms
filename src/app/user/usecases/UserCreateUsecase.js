const makeUser = require('src/app/user/entities/User');
const makePubUser = require('src/app/user/entities/PubEntity');

const fileName = 'UserCreateUsecase';

module.exports = ({ logger, userRepository, pubSub }) => ({
  createUser: async (user) => {
    const callName = `${fileName}.createUser()`;
    logger.info(`${callName} entered with body: ${JSON.stringify(user)}`);
    const entity = makeUser(user);
    return userRepository.createUser(entity).then(async (user) => {
      const pubUser = makePubUser(user, 'create');
      await pubSub.publish('user-change', pubUser);
      return user;
    });
  },
});
