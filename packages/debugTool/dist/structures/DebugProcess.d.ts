import { ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, Message } from 'discord.js';
import { DebugProcessFunction } from '../../types';
export declare class DebugProcess {
    name: string;
    execute: DebugProcessFunction<Message>;
    executeSlash?: DebugProcessFunction<ChatInputCommandInteraction<import("discord.js").CacheType>> | undefined;
    static buttons: ActionRowBuilder<ButtonBuilder>;
    constructor(name: string, execute: DebugProcessFunction<Message>, executeSlash?: DebugProcessFunction<ChatInputCommandInteraction<import("discord.js").CacheType>> | undefined);
}
