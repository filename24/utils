"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Logger: () => Logger
});
module.exports = __toCommonJS(src_exports);

// src/Logger.ts
var import_chalk = __toESM(require("chalk"));
var import_strip_ansi = __toESM(require("strip-ansi"));
var import_winston = require("winston");
var { printf, splat, colorize, timestamp, ms, combine } = import_winston.format;
var colors = {
  fatal: import_chalk.default.bgWhite.red.bold,
  error: import_chalk.default.red,
  warn: import_chalk.default.yellow,
  info: import_chalk.default.cyanBright,
  chat: (text) => text,
  verbose: import_chalk.default.blueBright,
  debug: import_chalk.default.blue
};
var myFormat = printf(({ level, message, label, ms: ms2, timestamp: timestamp2 }) => {
  const _level = (0, import_strip_ansi.default)(level);
  const colorizer = colors[_level];
  return `${import_chalk.default.gray(`[${timestamp2}]`)} ${_level === "chat" ? "" : `[ ${label} ] `}${level} ${colorizer(
    message
  )} ${import_chalk.default.magentaBright(ms2)}`;
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
(0, import_winston.addColors)(myCustomLevels.colors);
var Logger = class {
  scope;
  logger;
  options;
  constructor(scope, options = { level: "info" }) {
    this.options = options;
    this.scope = scope;
    this.logger = (0, import_winston.createLogger)({
      levels: myCustomLevels.levels,
      transports: [
        new import_winston.transports.Console({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Logger
});
//# sourceMappingURL=index.js.map