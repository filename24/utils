'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const discord_js_1 = require('discord.js');
class DebugTool {
  client;
  owners;
  options;
  process = new discord_js_1.Collection();
  constructor(client, options) {
    if (!(client instanceof discord_js_1.Client))
      throw new TypeError('Invalid `client`. `client` parameter is required.');
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
  async start(message) {
    if (!this.owners.includes(message.author.id)) return this.options.noPermission(message);
  }
}
exports.default = DebugTool;
//# sourceMappingURL=DebugTool.js.map
