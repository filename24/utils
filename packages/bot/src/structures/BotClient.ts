import { Client, ClientOptions, ClientEvents, Collection, Snowflake } from 'discord.js';
import { Logger } from '@anhgerel/logger';
import { PrismaClient } from '@prisma/client';

import type { BaseInteraction } from './Interaction';
import type { IBaseCommand } from './Command';
import { Event } from './Event';

import Dokdo from 'dokdo';
import { CommandManager } from '../managers/CommandManager';
import { EventManager } from '../managers/EventManager';
import { ErrorManager } from '../managers/ErrorManager';
import { DatabaseManager } from '../managers/DatabaseManager';
import { InteractionManager } from '../managers/InteractionManager';

const logger = new Logger('bot');

export class BotClient extends Client {
  public readonly VERSION?: string;
  public readonly BUILD_NUMBER?: string | null;
  public readonly config: BotClientConfig;

  public commands: Collection<string, IBaseCommand> = new Collection();
  public events: Collection<keyof ClientEvents, Event<keyof ClientEvents>> = new Collection();
  public errors: Collection<string, string> = new Collection();
  public interactions: Collection<string, BaseInteraction> = new Collection();
  public db?: PrismaClient;

  public command: CommandManager = new CommandManager(this);
  public event: EventManager = new EventManager(this);
  public error: ErrorManager = new ErrorManager(this);
  public interaction?: InteractionManager;
  public database?: DatabaseManager;
  public dokdo?: Dokdo;

  public constructor(options: BotClientOptions) {
    super(options.client);

    logger.info('Loading config data...');
    this.config = options.config;

    if (options.plugins.includes(Plugin.All) || options.plugins.includes(Plugin.Dokdo)) {
      logger.debug('Enabling Dokdo plugin...');

      this.dokdo = new Dokdo(this, {
        prefix: this.config.bot.prefix,
        noPerm: async (message) => message.reply('You do not have permission to use this command.'),
      });
    }
    if (options.plugins.includes(Plugin.All) || options.plugins.includes(Plugin.Database)) {
      logger.debug('Enabling Database plugin...');

      this.database = new DatabaseManager(this);

      this.database.load();
    }
    if (options.plugins.includes(Plugin.All) || options.plugins.includes(Plugin.Interaction)) {
      logger.debug('Enabling Interaction plugin...');

      this.interaction = new InteractionManager(this);

      this.interaction.load(options.initPaths.interaction);
    }

    logger.debug('Enabling Command plugin...');
    this.command.load(options.initPaths.command);

    logger.debug('Enabling Event plugin...');
    this.event.load(options.initPaths.event);

    this.VERSION = this.config.BUILD_VERSION;
    this.BUILD_NUMBER = this.config.BUILD_NUMBER;
  }

  public async start(token: string = this.config.bot.token): Promise<void> {
    logger.info('Logging in bot...');
    await this.login(token).then(() => this.setStatus());
  }

  public async setStatus(status: 'dev' | 'online' = 'online', name = '점검중...') {
    if (status.includes('dev')) {
      logger.warn('Changed status to Developent mode');
      this.user?.setPresence({
        activities: [{ name: `${this.config.bot.prefix}help | ${this.VERSION} : ${name}` }],
        status: 'dnd',
      });
    } else if (status.includes('online')) {
      logger.info('Changed status to Online mode');

      this.user?.setPresence({
        activities: [{ name: `${this.config.bot.prefix}help | ${this.VERSION}` }],
        status: 'online',
      });
    }
  }
}

export const enum Plugin {
  Command = 1 << 1,
  Event = 2 << 1,
  Error = 3 << 1,
  /**
   * Enables the Database plugin
   * See more info at https://prisma.io/
   */
  Database = 4 << 1,
  Interaction = 5 << 1,
  /**
   * Enable dokdo plugin.
   * See more info at https://dokdo.js.org/
   */
  Dokdo = 6 << 1,
  /**
   * Enable all plugins
   */
  All = Plugin.Command | Plugin.Event | Plugin.Error | Plugin.Database | Plugin.Interaction | Plugin.Dokdo,
}

export interface BotClientOptions {
  client: ClientOptions;
  config: BotClientConfig;
  initPaths: {
    command: string;
    event: string;
    interaction: string;
  };
  plugins: Plugin[];
}

export interface ErrorReportConfig {
  type: 'webhook' | 'text';
  webhook: {
    url: string;
  };
  text: {
    guildID: Snowflake;
    channelID: Snowflake;
  };
}

export interface BotClientConfig {
  BUILD_VERSION?: string;
  BUILD_NUMBER?: string | null;
  bot: {
    prefix: string;
    token: string;
  };
  report: ErrorReportConfig;
}
