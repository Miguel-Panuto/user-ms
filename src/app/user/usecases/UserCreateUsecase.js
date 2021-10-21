const makeUser = require('src/app/user/entities/User');
const makePubUser = require('src/app/user/entities/PubEntity');
const makeAuthUser = require('../entities/UserPubAuth');

const fileName = 'UserCreateUsecase';

module.exports = ({
  logger,
  userRepository,
  pubSub,
  config: {
    amqp: { pubs },
  },
}) => ({
  createUser: async (user) => {
    const callName = `${fileName}.createUser()`;
    logger.info(`${callName} entered with body: ${JSON.stringify(user)}`);
    const entity = makeUser(user);
    return userRepository.createUser(entity).then(async (userCreated) => {
      const pubUser = makePubUser(userCreated, 'create');
      const authUser = makeAuthUser({
        ...userCreated._doc,
        password: user.password,
      });
      await pubSub.publish(pubs[1].topicName, pubUser);
      await pubSub.publish(pubs[2].topicName, authUser);
      return userCreated;
    });
  },
});
