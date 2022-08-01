import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction, Message } from 'discord.js';
import { BotClient } from './BotClient';

export class SlashCommand {
  constructor(
    public data: SlashCommandBuilder,
    public execute: SlashCommandFunction,
    public options?: SlashCommandOptions,
    public slash?: ISlashCommand,
  ) {}
}

export class MessageCommand {
  constructor(public data: MessageCommandOptions, public execute: MessageCommandFuntion) {}
}

export class BaseCommand extends MessageCommand {
  constructor(
    public data: MessageCommandOptions,
    public execute: MessageCommandFuntion,
    public slash?: SlashCommand | undefined,
  ) {
    super(data, execute);
  }
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

export type MessageCommandFuntion = (
  client: BotClient,
  message: Message,
  args: string[],
) => Promise<any> | Promise<any>;
export type SlashCommandFunction = (client: BotClient, interaction: ChatInputCommandInteraction) => Promise<any>;
export type IBaseCommand = MessageCommnad | SlashCommand | Command;
export interface SlashCommandOptions {
  name: string;
  isSlash?: boolean;
}
