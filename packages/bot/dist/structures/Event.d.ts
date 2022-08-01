import { ClientEvents } from 'discord.js';
import { BotClient } from './BotClient';
export declare class Event<E extends keyof ClientEvents> {
    name: E;
    execute: EventFunction<E>;
    options?: EventOptions | undefined;
    constructor(name: E, execute: EventFunction<E>, options?: EventOptions | undefined);
    static isEvent(event: unknown): event is Event<keyof ClientEvents>;
    static waitUntil<E extends keyof ClientEvents>(client: BotClient, event: E, checkFunction?: (...args: ClientEvents[E]) => boolean, timeout?: number): Promise<ClientEvents[E] | []>;
}
export declare type EventFunction<E extends keyof ClientEvents> = (client: BotClient, ...args: ClientEvents[E]) => Promise<any>;
export interface EventOptions {
    once: boolean;
}
