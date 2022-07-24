import { Client, Message, Collection, Snowflake } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import type { DebugArgs, DebugToolOptions, DebugType } from '../../types';
import { DebugProcess } from './DebugProcess';

export class DebugTool {
  public client: Client<true>;
  public owners: Snowflake[];
  public process: Collection<string, DebugProcess> = new Collection();
  public args!: DebugArgs;
  public readonly options: DebugToolOptions;

  constructor(client: Client, options: DebugToolOptions) {
    if (!(client instanceof Client)) throw new TypeError('Invalid `client`. `client` parameter is required.');
    this.client = client;

    if (options.noPermission && typeof options.noPermission !== 'function')
      throw new TypeError('`noPermission` must allow a function.');

    if (!options.noPermission)
      options.noPermission = (message) => message.reply('You are not allowed to use this command.');

    this.owners = options.owners || [];

    client.once('ready', (client) => {
      if (this.owners.length === 0) {
        console.warn('[ debugTool ] Owners not given. Fetching from Application.');
        client.application.fetch().then((data) => {
          this.owners =
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data.owner.members?.map((el) => el.id) || [data.owner.id] || [];
          console.info(
            `[ debugTool ] Fetched ${this.owners.length} owner(s): ${
              this.owners.length > 3
                ? this.owners.slice(0, 3).join(', ') + ` and ${this.owners.length - 3} more owners`
                : this.owners.join(', ')
            }`,
          );
        });
      }
    });

    this.options = options;
    if (!options.aliases || !options.aliases.length) options.aliases = ['debug', 'debugtool'];

    this.load();
  }

  private load(processPath = path.join(__dirname, '../commands')) {
    const processFiles = readdirSync(processPath);

    processFiles.forEach(async (processFile) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const event: DebugProcess = require(`../commands/${processFile}`).default;

        this.process.set(event.name, event);
      } catch (error: any) {
        console.error(`[ debugTool ] Error loading command '${processFile}'.\n` + error.stack);
      }
    });
  }
  public async startMessage(message: Message) {
    const args = message.content.slice(this.options.prefix.length).trim().split(/ +/g);
    this.args = {
      commandName: args[0],
      type: args[1] as DebugType,
      content: args.slice(2).join(' '),
      raw: message.content,
    };
    if (!this.options.aliases?.includes(this.args.commandName)) return;
    if (!this.isOwner(message.author.id)) return this.options.noPermission!(message);
    if (!this.args.content && this.args.type) return message.reply('❌ Missing Arguments.');

    if (!this.args.type) return this.process.get('main')?.execute(message, this);

    if (this.args.type === 'eval' || this.args.type === 'js') return this.process.get('eval')?.execute(message, this);
    else if (this.args.type === 'sh') return this.process.get('shell')?.execute(message, this);
    else if (this.args.type === 'cat') return this.process.get('cat')?.execute(message, this);
    else if (this.args.type === 'curl') return this.process.get('curl')?.execute(message, this);
    else if (this.args.type === 'shard') return this.process.get('shard')?.execute(message, this);
    else if (this.args.type === 'docs') return this.process.get('docs')?.execute(message, this);
    else
      return message.reply(
        `Invalid type. Available types: \`${this.process.map((_process, name) => name).join(', ')}\``,
      );
  }

  public isOwner(id: Snowflake): boolean {
    return this.owners.includes(id);
  }

  public _addOwner(id: Snowflake): boolean {
    this.owners.push(id);

    return true;
  }

  public _removeOwner(id: Snowflake): boolean {
    if (!this.owners.includes(id)) return false;
    this.owners.splice(this.owners.indexOf(id), 1);

    return true;
  }
}
