"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const PageManager_1 = require("../managers/PageManager");
const DebugProcess_1 = require("../structures/DebugProcess");
const Utils_1 = require("../utils/Utils");
exports.default = new DebugProcess_1.DebugProcess('eval', async (message, debug) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { client } = debug;
    const res = await new Promise((resolve) => resolve(eval(debug.args.content)));
    const result = (0, util_1.inspect)(res, {
        depth: 0,
        maxArrayLength: 1000,
        showHidden: true,
        maxStringLength: 1000,
        showProxy: true,
        getters: true,
    }).replaceAll(debug.client.token, 'TOKEN');
    const pages = new PageManager_1.PageManager((0, Utils_1.splitMessage)(result), message);
    pages.listen(await message.reply({ content: (0, discord_js_1.codeBlock)('js', pages.getPage(0)), components: [DebugProcess_1.DebugProcess.buttons] }));
});
//# sourceMappingURL=eval.js.map