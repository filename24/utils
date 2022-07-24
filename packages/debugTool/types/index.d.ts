import type { ChatInputCommandInteraction, Message, Snowflake } from 'discord.js';
import { DebugTool } from '../src/structures/DebugTool';

export interface DebugToolOptions {
  prefix: string;
  owners?: Snowflake[];
  aliases?: string[];
  isSlash?: boolean;
  noPermission?(message: Message): Promise<any>;
}
export interface DebugToolProcess {
  name: string;
  execute: DebugProcessFunction;
}

export interface DebugArgs {
  commandName: string;
  type: DebugType;
  content: string;
  raw: string;
}

export type DebugType = 'js' | 'sh' | 'shard' | 'docs' | 'cat' | 'eval' | 'curl';
export type DebugProcessFunction<T extends Message | ChatInputCommandInteraction> = (
  context: T,
  debug: DebugTool,
) => Promise<any>;
