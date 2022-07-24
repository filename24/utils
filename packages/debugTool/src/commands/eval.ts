import { codeBlock, EmbedBuilder } from 'discord.js';
import { inspect } from 'util';
import { PageManager } from '../managers/PageManager';
import { DebugProcess } from '../structures/DebugProcess';
import { splitMessage } from '../utils/Utils';

export default new DebugProcess('eval', async (message, debug) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { client } = debug;

  const res = await new Promise((resolve) => resolve(eval(debug.args.content)));

  const result = inspect(res, {
    depth: 0,
    maxArrayLength: 1000,
    showHidden: true,
    maxStringLength: 1000,
    showProxy: true,
    getters: true,
  }).replaceAll(debug.client.token, 'TOKEN');

  const pages = new PageManager(splitMessage(result), message);
  pages.listen(await message.reply({ content: codeBlock('js', pages.getPage(0)), components: [DebugProcess.buttons] }));
});
