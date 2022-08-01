import { BotClient } from '../structures/BotClient';
import { BaseInteraction } from '../structures/Interaction';
import BaseManager from './BaseManager';
export declare class InteractionManager extends BaseManager {
    private logger;
    readonly interactions: BotClient['interactions'];
    constructor(client: BotClient);
    load(interactionPath?: string): Promise<void>;
    get(name: string): BaseInteraction | undefined;
}
