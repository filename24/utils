import type { ClientEvents } from 'discord.js';
import type { BotClient } from '../structures/BotClient';
import BaseManager from './BaseManager';
/**
 * @extends {BaseManager}
 */
export declare class EventManager extends BaseManager {
    private logger;
    private events;
    constructor(client: BotClient);
    load(eventPath?: string): Promise<void>;
    private start;
    reload(eventPath?: string): void;
    /**
     * @example EventManager.register('ready', (client) => {
     *  console.log(`${client.user.tag} is ready!`)
     * })
     */
    register(eventName: keyof ClientEvents, fn: (client: BotClient, ...args: ClientEvents[keyof ClientEvents]) => Promise<any>): void;
}
