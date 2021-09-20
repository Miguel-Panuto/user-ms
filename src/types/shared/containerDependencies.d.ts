import { Logger } from 'winston';
import IConfig from './config';

export default interface IContainerDependencies {
  logger: Logger;
  config: IConfig;
}
