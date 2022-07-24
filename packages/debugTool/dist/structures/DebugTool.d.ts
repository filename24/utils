import { Client, Message, Collection } from 'discord.js';
import type { DebugToolOptions } from '../../types';
import type { DebugProcess } from './DebugProcess';
declare class DebugTool {
  private client;
  owners: DebugToolOptions['owners'];
  readonly options: DebugToolOptions;
  process: Collection<string, DebugProcess>;
  constructor(client: Client, options: DebugToolOptions);
  start(message: Message): Promise<any>;
}
export default DebugTool;
