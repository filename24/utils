var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/Logger.ts
import chalk from "chalk";
import stripColor from "strip-ansi";
import { createLogger, format, transports, addColors } from "winston";
var { printf, splat, colorize, timestamp, ms, combine } = format;
var colors = {
  fatal: chalk.bgWhite.red.bold,
  error: chalk.red,
  warn: chalk.yellow,
  info: chalk.cyanBright,
  chat: (text) => text,
  verbose: chalk.blueBright,
  debug: chalk.blue
};
var myFormat = printf(({ level, message, label, ms: ms2, timestamp: timestamp2 }) => {
  const _level = stripColor(level);
  const colorizer = colors[_level];
  return `${chalk.gray(`[${timestamp2}]`)} ${_level === "chat" ? "" : `[ ${label} ] `}${level} ${colorizer(
    message
  )} ${chalk.magentaBright(ms2)}`;
});
var myCustomLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    chat: 4,
    verbose: 5,
    debug: 6
  },
  colors: {
    fatal: "whiteBG red bold",
    error: "red",
    warn: "yellow",
    info: "white",
    chat: "grey",
    verbose: "cyan",
    debug: "blue"
  }
};
addColors(myCustomLevels.colors);
var Logger = class {
  scope;
  logger;
  options;
  constructor(scope, options = { level: "info" }) {
    this.options = options;
    this.scope = scope;
    this.logger = createLogger({
      levels: myCustomLevels.levels,
      transports: [
        new transports.Console({
          level: options.dev ? "debug" : options.level,
          format: combine(
            splat(),
            colorize(),
            timestamp({
              format: "YYYY-MM-DD HH:mm:ss"
            }),
            ms(),
            myFormat
          )
        })
      ]
    });
  }
  log(message, ...args) {
    this.logger.info(message, ...args, { label: this.scope });
  }
  info(message, ...args) {
    this.logger.info(message, ...args, { label: this.scope });
  }
  warn(message, ...args) {
    this.logger.warn(message, ...args, { label: this.scope });
  }
  error(message, ...args) {
    this.logger.error(message, ...args, { label: this.scope });
  }
  debug(message, ...args) {
    this.logger.debug(message, ...args, { label: this.scope });
  }
  fatal(message, ...args) {
    this.logger.error(message, ...args, { label: this.scope });
    return process.exit(1);
  }
};
__name(Logger, "Logger");
export {
  Logger
};
//# sourceMappingURL=index.mjs.map