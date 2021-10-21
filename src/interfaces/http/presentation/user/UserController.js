const fileName = 'UserController';

module.exports = ({
  logger,
  userCreateUsecase,
  findUsersUsecase,
  findUserByIdUsecase,
  updateUserUsecase,
  deleteUserUsecase,
}) => ({
  findUsers: async (req, res) => {
    const callName = `${fileName}.findUsers()`;
    const { pg } = req.query;
    try {
      logger.info(`${callName} entered with page: ${!pg ? 0 : pg}`);
      const users = await findUsersUsecase.find(pg);
      const status = users.length <= 0 ? 204 : 200;
      return res.status(status).json(users);
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: 'a error has been ocoured' });
    }
  },

  findUser: async (req, res) => {
    const callName = `${fileName}.findUser()`;
    try {
      const { id } = req.params;
      logger.info(`${callName} entered with id: ${id}`);
      const user = await findUserByIdUsecase.find(id);
      const status = !user ? 204 : 200;
      return res.status(status).json(user);
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: 'a error has been ocoured' });
    }
  },

  createUser: async (req, res) => {
    const callName = `${fileName}.createUser()`;
    const body = req.body;
    try {
      logger.info(`${callName} entered with body: ${JSON.stringify(body)}`);
      const user = await userCreateUsecase.createUser(body);
      return res.status(201).json({
        success: {
          message: 'user created with success',
          user,
        },
      });
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: 'a error has been ocoured' });
    }
  },

  changeUser: async (req, res) => {
    const callName = `${fileName}.changeUser()`;
    const body = req.body;
    const { id } = req.params;
    try {
      logger.info(`${callName} entered with body: ${JSON.stringify(body)}`);
      const user = await updateUserUsecase.update(id, body);
      return res.status(200).json({
        success: {
          message: 'user changed with success',
          user,
        },
      });
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: 'a error has been ocoured' });
    }
  },

  deleteUser: async (req, res) => {
    const callName = `${fileName}.deleteUser()`;
    const { id } = req.params;
    try {
      logger.info(`${callName} entered with id: ${id}`);
      await deleteUserUsecase.delete(id);
      return res.status(200).json({
        success: {
          message: 'user deleted with success',
        },
      });
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: 'a error has been ocoured' });
    }
  },
});
