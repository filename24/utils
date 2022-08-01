import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction, Message } from 'discord.js';
import { BotClient } from './BotClient';
export declare class SlashCommand {
    data: SlashCommandBuilder;
    execute: SlashCommandFunction;
    options?: SlashCommandOptions | undefined;
    slash?: ISlashCommand | undefined;
    constructor(data: SlashCommandBuilder, execute: SlashCommandFunction, options?: SlashCommandOptions | undefined, slash?: ISlashCommand | undefined);
}
export declare class MessageCommand {
    data: MessageCommandOptions;
    execute: MessageCommandFuntion;
    constructor(data: MessageCommandOptions, execute: MessageCommandFuntion);
}
export declare class BaseCommand extends MessageCommand {
    data: MessageCommandOptions;
    execute: MessageCommandFuntion;
    slash?: SlashCommand | undefined;
    constructor(data: MessageCommandOptions, execute: MessageCommandFuntion, slash?: SlashCommand | undefined);
}
export interface MessageCommnad {
    data: MessageCommandOptions;
    execute: MessageCommandFuntion;
}
export interface Command extends MessageCommnad {
    isSlash?: boolean;
    slash?: ISlashCommand;
}
export interface ISlashCommand {
    data: SlashCommandBuilder;
    execute: SlashCommandFunction;
    options?: SlashCommandOptions;
    slash?: ISlashCommand;
}
export interface MessageCommandOptions {
    name: string;
    description?: string;
    aliases: string[];
}
export declare type MessageCommandFuntion = (client: BotClient, message: Message, args: string[]) => Promise<any> | Promise<any>;
export declare type SlashCommandFunction = (client: BotClient, interaction: ChatInputCommandInteraction) => Promise<any>;
export declare type IBaseCommand = MessageCommnad | SlashCommand | Command;
export interface SlashCommandOptions {
    name: string;
    isSlash?: boolean;
}
