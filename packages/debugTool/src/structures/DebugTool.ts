import { Client, Message, Collection } from 'discord.js';
import type { DebugToolOptions } from '../../types';
import type { DebugProcess } from './DebugProcess';

class DebugTool {
  private client: Client<true>;
  public owners: DebugToolOptions['owners'];
  public readonly options: DebugToolOptions;
  public process: Collection<string, DebugProcess> = new Collection();

  constructor(client: Client, options: DebugToolOptions) {
    if (!(client instanceof Client)) throw new TypeError('Invalid `client`. `client` parameter is required.');
    this.client = client;

    if (options.noPermission && typeof options.noPermission !== 'function')
      throw new TypeError('`noPermission` must allow a function.');

    if (!options.noPermission)
      options.noPermission = (message) => message.reply('You are not allowed to use this command.');

    this.owners = options.owners;

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
  }

  public async start(message: Message) {
    if (!this.owners.includes(message.author.id)) return this.options.noPermission!(message);
  }
}

export default DebugTool;
