import type { Client, Message } from 'discord.js';
import DebugTool from '../src/structures/DebugTool';

export interface DebugToolOptions {
  prefix: string;
  owners: Snowflake[];
  aliases: string[];
  isSlash?: boolean;
  noPermission?(message: Message): Promise<any>;
}

export type Snowflake = string;
export interface DebugToolProcess {
  name: string;
  execute: DebugProcessFunction;
}

export type DebugProcessFunction = (client: Client, debug: DebugTool) => Promise<any>;
