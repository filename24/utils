import { Interaction, Message } from 'discord.js';
import BaseManager from './BaseManager';
import { BotClient } from '../structures/BotClient';
export interface ErrorReportOptions {
    executer: Message | Interaction | undefined;
    isSend?: boolean;
}
export declare class ErrorManager extends BaseManager {
    private logger;
    constructor(client: BotClient);
    report(error: Error, options?: ErrorReportOptions): TypeError | undefined;
}
