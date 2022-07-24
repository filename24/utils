import { Client, Message, Collection, Snowflake } from 'discord.js';
import type { DebugArgs, DebugToolOptions } from '../../types';
import { DebugProcess } from './DebugProcess';
export declare class DebugTool {
    client: Client<true>;
    owners: Snowflake[];
    process: Collection<string, DebugProcess>;
    args: DebugArgs;
    readonly options: DebugToolOptions;
    constructor(client: Client, options: DebugToolOptions);
    private load;
    startMessage(message: Message): Promise<any>;
    isOwner(id: Snowflake): boolean;
    _addOwner(id: Snowflake): boolean;
    _removeOwner(id: Snowflake): boolean;
}
