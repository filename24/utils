import BaseManager from './BaseManager';
import { BotClient } from '../structures/BotClient';
export declare class DatabaseManager extends BaseManager {
    private logger;
    constructor(client: BotClient);
    load(): Promise<void>;
}
