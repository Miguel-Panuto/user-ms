const makeUser = require('src/app/user/entities/UpdateUserEntity');
const makePubUser = require('src/app/user/entities/PubEntity');

const fileName = 'UpdateUserUsecase';

module.exports = ({ logger, userRepository, pubSub }) => ({
  update: async (id, body) => {
    const callName = `${fileName}.update()`;
    logger.info(
      `${callName} entered with id ${id} and body ${JSON.stringify(body)}`
    );
    const userToUpdate = makeUser(body);
    logger.info(
      `${callName} update with fields ${JSON.stringify(userToUpdate)}`
    );
    await userRepository.changeUser(id, userToUpdate);
    const pubUser = makePubUser({ ...userToUpdate, id }, 'update');
    await pubSub.publish('user-change', pubUser);
    return userRepository.findUserById(id);
  },
});
