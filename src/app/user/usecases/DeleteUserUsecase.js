const makeUser = require('src/app/user/entities/UpdateUserEntity');
const makePubUser = require('src/app/user/entities/PubEntity');

const fileName = 'UpdateUserUsecase';

module.exports = ({
  logger,
  userRepository,
  pubSub,
  config: {
    amqp: { pubs },
  },
}) => ({
  delete: async (id) => {
    const callName = `${fileName}.delete()`;
    logger.info(`${callName} entered with id ${id}`);
    await userRepository.delete(id);
    const pubUser = makePubUser({ id }, 'delete');
    await pubSub.publish(pubs[1].topicName, pubUser);
  },
});
