"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const DebugProcess_1 = require("../structures/DebugProcess");
const Utils_1 = require("../utils/Utils");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ToolVersion = require('../../package.json').version;
exports.default = new DebugProcess_1.DebugProcess('main', async (message, debug) => {
    const description = [
        `Process started at **${(0, discord_js_1.time)(Utils_1.System.processStartTime())}**`,
        `Bot was online for **${(0, discord_js_1.time)(debug.client.readyAt, 'R')}**`,
    ];
    const field = [
        '```diff',
        `+ Discord.js: v${discord_js_1.version}`,
        `+ Node.js: ${process.version}`,
        `+ Platform: ${(0, Utils_1.platfromReslove)(process.platform)}`,
        `+ DebugTool: v${ToolVersion}`,
        `+ Memory usage: ${Utils_1.System.getMemoryUsage()}`,
        (0, Utils_1.pingStatus)(debug.client.ws.ping),
        '```',
    ];
    const cache = `${debug.client.guilds.cache.size} guild(s) and ${debug.client.users.cache.size} user(s)`;
    if (debug.client.shard) {
        const guilds = (await debug.client.shard
            .fetchClientValues('guilds.cache.size')
            .then((r) => r.reduce((prev, val) => Number(prev) + Number(val), 0)));
        description.push(`Running on PID ${process.pid} for this client, and running on PID ${process.ppid} for the parent process.`, '', `This bot is sharded in ${Array.isArray(debug.client.shard) ? debug.client.shard.length : debug.client.shard.count} shard(s) and running in ${guilds} guild(s).\nCan see ${cache} in this client.`);
    }
    else
        description.push(`Running on **PID ${process.pid}**\n\nThis bot is not sharded and can see **${cache}**.`);
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle('Debug Tool')
        .setDescription(description.join('\n'))
        .setColor('#5865F2')
        .setFields([
        {
            name: '> **Info**',
            value: field.join('\n'),
            inline: true,
        },
    ]);
    message.reply({ embeds: [embed] });
});
//# sourceMappingURL=main.js.map