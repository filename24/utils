import { ApplicationCommandDataResolvable } from 'discord.js';
import { IBaseCommand, SlashCommand } from '../structures/Command';
import BaseManager from './BaseManager';
import { BotClient } from '../structures/BotClient';
export declare class CommandManager extends BaseManager {
    private logger;
    private commands;
    constructor(client: BotClient);
    load(commandPath?: string): void;
    get(commandName: string): IBaseCommand | undefined;
    reload(commandPath?: string): {
        message: string;
    };
    isSlash(command: IBaseCommand | undefined): command is SlashCommand;
    slashCommandSetup(guildID: string): Promise<ApplicationCommandDataResolvable[] | undefined>;
}
