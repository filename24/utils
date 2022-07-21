import { Client } from 'discord.js';
import { DebugToolOptions } from '../../types';

class DebugTool {
  private client: Client<boolean>;
  public owners: DebugToolOptions['owners'];
  public readonly options: DebugToolOptions;

  constructor(client: Client, options: DebugToolOptions) {
    this.options = options;

    if (!(client instanceof Client)) throw new TypeError('Invalid `client`. `client` parameter is required.');
    this.client = client;

    if (options.noPermission && typeof options.noPermission !== 'function')
      throw new TypeError('`noPermission` must allow a function.');

    this.owners = options.owners;

    client.once('ready', () => {
      if (!this.owners) {
        console.warn('[ debugTool ] Owners not given. Fetching from Application.');
        client.application.fetch().then((data) => {
          // @ts-ignore
          this.owners = data.owner.members?.map((el) => el.id) || [data.owner.id] || [];
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

    if (!options.aliases || !options.aliases.length) options.aliases = ['debug', 'debugtool'];
  }
}

export default DebugTool;
