import { Message, Snowflake } from 'discord.js';

export interface DebugToolOptions {
  prefix: string;
  owners: Snowflake[];
  aliases: string[];
  noPermission?(message: Message): Promise<any>;
}
