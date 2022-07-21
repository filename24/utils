import chalk from 'chalk';
import stripColor from 'strip-ansi';
import winston, { createLogger, format, transports, addColors } from 'winston';

const { printf, splat, colorize, timestamp, ms, combine } = format;

const colors = {
  fatal: chalk.bgWhite.red.bold,
  error: chalk.red,
  warn: chalk.yellow,
  info: chalk.cyanBright,
  chat: (text: string) => text,
  verbose: chalk.blueBright,
  debug: chalk.blue,
};

const myFormat = printf(({ level, message, label, ms, timestamp }) => {
  const _level = stripColor(level) as LoggerLevel;
  const colorizer = colors[_level];
  return `${chalk.gray(`[${timestamp}]`)} ${_level === 'chat' ? '' : `[ ${label} ] `}${level} ${colorizer(
    message,
  )} ${chalk.magentaBright(ms)}`;
});

const myCustomLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    chat: 4,
    verbose: 5,
    debug: 6,
  },
  colors: {
    fatal: 'whiteBG red bold',
    error: 'red',
    warn: 'yellow',
    info: 'white',
    chat: 'grey',
    verbose: 'cyan',
    debug: 'blue',
  },
};

addColors(myCustomLevels.colors);

export class Logger {
  public scope: string;
  private readonly logger: winston.Logger;
  public readonly options: LoggerOptions;

  constructor(scope: string, options: LoggerOptions = { level: 'info' }) {
    this.options = options;
    this.scope = scope;
    this.logger = createLogger({
      levels: myCustomLevels.levels,
      transports: [
        new transports.Console({
          level: options.dev ? 'debug' : options.level,
          format: combine(
            splat(),
            colorize(),
            timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            ms(),
            myFormat,
          ),
        }),
      ],
    });
  }

  log(message: string, ...args: any[]) {
    this.logger.info(message, ...args, { label: this.scope });
  }

  info(message: string, ...args: any[]) {
    this.logger.info(message, ...args, { label: this.scope });
  }
  warn(message: string, ...args: any[]) {
    this.logger.warn(message, ...args, { label: this.scope });
  }

  error(message: string, ...args: any[]) {
    this.logger.error(message, ...args, { label: this.scope });
  }

  debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args, { label: this.scope });
  }

  fatal(message: string, ...args: any[]): any {
    this.logger.error(message, ...args, { label: this.scope });
    return process.exit(1);
  }
}

export type LoggerLevel = 'fatal' | 'error' | 'warn' | 'info' | 'chat' | 'verbose' | 'debug';
export interface LoggerOptions {
  level?: LoggerLevel;
  dev?: boolean;
}
