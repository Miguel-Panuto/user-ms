import express from 'express';
import helmet from 'helmet';
import spdy from 'spdy';

import IConfig from 'src/types/shared/config';
import IContainerDependencies from 'src/types/shared/containerDependencies';
import { Logger } from 'winston';

class Server {
  private config: IConfig;
  private logger: Logger;
  private express: express.Express;

  constructor({
    config,
    logger,
  }: Pick<IContainerDependencies, 'config' | 'logger'>) {
    this.logger = logger;
    this.config = config;
    this.express = express();
    this.express.use(helmet());
    this.express.use(helmet.noCache());
  }

  start() {
    return new Promise<void>((resolve) => {
      const server = spdy
        .createServer(this.express)
        .listen(this.config.web.port, () => {
          const { port } = server.address() as Record<string, any>;

          this.logger.info(`[p ${process.pid}] Listening at port ${port}`);

          resolve();
        });
    });
  }
}

module.exports = Server;
