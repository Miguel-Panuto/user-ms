import winston from 'winston';
import path from 'path';

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(
    (info) => `[${new Date(info.timestamp)}][${info.level}] - ${info.message}`
  )
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format,
    }),
    new winston.transports.File({
      dirname: path.join('logs'),
      level: 'info',
      format,
      maxsize: 100000,
      maxFiles: 100,
    }),
  ],
});

export default logger;
