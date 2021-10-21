const fileName = 'UserRepository';

module.exports = class UserRepository {
  constructor({ logger, userModel }) {
    this.logger = logger;
    this.userModel = userModel;
  }

  async createUser(user) {
    const callName = `${fileName}.createUser()`;
    this.logger.info(`${callName} entered with body: ${JSON.stringify(user)}`);
    return this.userModel.create(user);
  }

  async findUsers(pg) {
    const callName = `${fileName}.findUsers()`;
    const page = !pg ? 1 : pg <= 0 ? 1 : pg;
    this.logger.info(`${callName} entered with pg: ${page}`);
    return this.userModel
      .find()
      .limit(10)
      .skip(10 * (page - 1));
  }

  async findUserById(id) {
    const callName = `${fileName}.findUserById()`;
    this.logger.info(`${callName} entered with id: ${id}`);
    return this.userModel.findById(id);
  }

  async findUserByEmail(email) {
    const callName = `${fileName}.findUserByEmail()`;
    this.logger.info(`${callName} entered with email: ${email}`);
    return this.userModel.findOne({ email });
  }

  async changeUser(id, obj) {
    const callName = `${fileName}.changeUser()`;
    this.logger.info(
      `${callName} entered with id: ${id} . And body: ${JSON.stringify(obj)}`
    );
    await this.userModel.findOneAndUpdate({ _id: id }, obj, {
      upsert: true,
      useFindAndModify: true,
    });
  }
  async delete(id) {
    const callName = `${fileName}.delete()`;
    this.logger.info(`${callName} entered with id: ${id}`);
    return this.userModel.deleteOne({ _id: id });
  }
};
