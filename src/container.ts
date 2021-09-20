import awilix from 'awilix';


const Server = require('./interfaces/http/Server');
const logger = require('./infra/logging/logger');

const { createContainer, asClass, asFunction, asValue, InjectionMode } = awilix;

const container = createContainer()
  .register({
    server: asClass(Server).singleton(),
    logger: asFunction(logger).singleton(),

  })
  .loadModules(
    [
      './infra/integration/**/*.ts',
      './infra/repositories/*.ts',
      './app/**/*.ts',
      './interfaces/http/errors/**/*.ts',
      './interfaces/http/constants/**/*.ts',
      './interfaces/http/middlewares/**/*.ts',
      './interfaces/amqp/**/*.ts',
    ],
    {
      cwd: __dirname,
      formatName: 'camelCase',
      resolverOptions: {
        injectionMode: InjectionMode.PROXY,
      },
    }
  );

export default container;
