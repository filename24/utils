import { Client, ClientOptions, ClientEvents, Collection, Snowflake } from 'discord.js';
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
export declare class BotClient extends Client {
    readonly VERSION?: string;
    readonly BUILD_NUMBER?: string | null;
    readonly config: BotClientConfig;
    commands: Collection<string, IBaseCommand>;
    events: Collection<keyof ClientEvents, Event<keyof ClientEvents>>;
    errors: Collection<string, string>;
    interactions: Collection<string, BaseInteraction>;
    db?: PrismaClient;
    command: CommandManager;
    event: EventManager;
    error: ErrorManager;
    interaction?: InteractionManager;
    database?: DatabaseManager;
    dokdo?: Dokdo;
    constructor(options: BotClientOptions);
    start(token?: string): Promise<void>;
    setStatus(status?: 'dev' | 'online', name?: string): Promise<void>;
}
export declare const enum Plugin {
    Command = 2,
    Event = 4,
    Error = 6,
    /**
     * Enables the Database plugin
     * See more info at https://prisma.io/
     */
    Database = 8,
    Interaction = 10,
    /**
     * Enable dokdo plugin.
     * See more info at https://dokdo.js.org/
     */
    Dokdo = 12,
    /**
     * Enable all plugins
     */
    All = 14
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
