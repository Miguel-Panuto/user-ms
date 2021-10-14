const {
  createContainer,
  asClass,
  asFunction,
  asValue,
  InjectionMode,
} = require('awilix');

const Server = require('./interfaces/http/Server');
const AmqpClient = require('./infra/amqp/AmqpClient');
const AmqpChannels = require('./infra/amqp/AmqpChannels');
const pubSub = require('./infra/amqp/PubSub');
const Router = require('./interfaces/http/Router');
const logger = require('./infra/logging/Logger');
const MongoConnection = require('./infra/db/MongoConnection');

const config = require('config/configLoader');

const container = createContainer()
  .register({
    server: asClass(Server).singleton(),
    logger: asFunction(logger).singleton(),
    router: asFunction(Router),
    config: asValue(config),
    amqpClient: asClass(AmqpClient).singleton(),
    amqpChannels: asClass(AmqpChannels).singleton(),
    mongoConnection: asClass(MongoConnection).singleton(),
    pubSub: asFunction(pubSub).singleton(),
  })
  .loadModules(
    [
      './infra/integration/**/*(*.js|*.ts)',
      './infra/repositories/*(*.js|*.ts)',
      './infra/db/models/*(*.js|*.ts)',
      './app/**/*(*.js|*.ts)',
      './interfaces/http/**/*(*.js|*.ts)',
      './interfaces/amqp/**/*(*.js|*.ts)',
    ],
    {
      cwd: __dirname,
      formatName: 'camelCase',
      resolverOptions: {
        injectionMode: InjectionMode.PROXY,
      },
    }
  );

module.exports = container;
