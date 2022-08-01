"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = exports.BotClient = void 0;
const discord_js_1 = require("discord.js");
const logger_1 = require("@anhgerel/logger");
const dokdo_1 = __importDefault(require("dokdo"));
const CommandManager_1 = require("../managers/CommandManager");
const EventManager_1 = require("../managers/EventManager");
const ErrorManager_1 = require("../managers/ErrorManager");
const DatabaseManager_1 = require("../managers/DatabaseManager");
const InteractionManager_1 = require("../managers/InteractionManager");
const logger = new logger_1.Logger('bot');
class BotClient extends discord_js_1.Client {
    VERSION;
    BUILD_NUMBER;
    config;
    commands = new discord_js_1.Collection();
    events = new discord_js_1.Collection();
    errors = new discord_js_1.Collection();
    interactions = new discord_js_1.Collection();
    db;
    command = new CommandManager_1.CommandManager(this);
    event = new EventManager_1.EventManager(this);
    error = new ErrorManager_1.ErrorManager(this);
    interaction;
    database;
    dokdo;
    constructor(options) {
        super(options.client);
        logger.info('Loading config data...');
        this.config = options.config;
        if (options.plugins.includes(14 /* Plugin.All */) || options.plugins.includes(12 /* Plugin.Dokdo */)) {
            logger.debug('Enabling Dokdo plugin...');
            this.dokdo = new dokdo_1.default(this, {
                prefix: this.config.bot.prefix,
                noPerm: async (message) => message.reply('You do not have permission to use this command.'),
            });
        }
        if (options.plugins.includes(14 /* Plugin.All */) || options.plugins.includes(8 /* Plugin.Database */)) {
            logger.debug('Enabling Database plugin...');
            this.database = new DatabaseManager_1.DatabaseManager(this);
            this.database.load();
        }
        if (options.plugins.includes(14 /* Plugin.All */) || options.plugins.includes(10 /* Plugin.Interaction */)) {
            logger.debug('Enabling Interaction plugin...');
            this.interaction = new InteractionManager_1.InteractionManager(this);
            this.interaction.load(options.initPaths.interaction);
        }
        logger.debug('Enabling Command plugin...');
        this.command.load(options.initPaths.command);
        logger.debug('Enabling Event plugin...');
        this.event.load(options.initPaths.event);
        this.VERSION = this.config.BUILD_VERSION;
        this.BUILD_NUMBER = this.config.BUILD_NUMBER;
    }
    async start(token = this.config.bot.token) {
        logger.info('Logging in bot...');
        await this.login(token).then(() => this.setStatus());
    }
    async setStatus(status = 'online', name = '점검중...') {
        if (status.includes('dev')) {
            logger.warn('Changed status to Developent mode');
            this.user?.setPresence({
                activities: [{ name: `${this.config.bot.prefix}help | ${this.VERSION} : ${name}` }],
                status: 'dnd',
            });
        }
        else if (status.includes('online')) {
            logger.info('Changed status to Online mode');
            this.user?.setPresence({
                activities: [{ name: `${this.config.bot.prefix}help | ${this.VERSION}` }],
                status: 'online',
            });
        }
    }
}
exports.BotClient = BotClient;
var Plugin;
(function (Plugin) {
    Plugin[Plugin["Command"] = 2] = "Command";
    Plugin[Plugin["Event"] = 4] = "Event";
    Plugin[Plugin["Error"] = 6] = "Error";
    /**
     * Enables the Database plugin
     * See more info at https://prisma.io/
     */
    Plugin[Plugin["Database"] = 8] = "Database";
    Plugin[Plugin["Interaction"] = 10] = "Interaction";
    /**
     * Enable dokdo plugin.
     * See more info at https://dokdo.js.org/
     */
    Plugin[Plugin["Dokdo"] = 12] = "Dokdo";
    /**
     * Enable all plugins
     */
    Plugin[Plugin["All"] = 14] = "All";
})(Plugin = exports.Plugin || (exports.Plugin = {}));
//# sourceMappingURL=BotClient.js.map