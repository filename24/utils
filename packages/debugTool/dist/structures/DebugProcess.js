"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugProcess = void 0;
const discord_js_1 = require("discord.js");
class DebugProcess {
    name;
    execute;
    executeSlash;
    static buttons = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.ButtonBuilder()
        .setLabel('Previous')
        .setCustomId('debug.previous')
        .setStyle(discord_js_1.ButtonStyle.Primary)
        .setEmoji('⬅'))
        .addComponents(new discord_js_1.ButtonBuilder()
        .setLabel('0/1 page')
        .setDisabled(true)
        .setStyle(discord_js_1.ButtonStyle.Secondary)
        .setCustomId('debug.pages'))
        .addComponents(new discord_js_1.ButtonBuilder().setLabel('Stop').setCustomId('debug.stop').setStyle(discord_js_1.ButtonStyle.Danger).setEmoji('⛔'))
        .addComponents(new discord_js_1.ButtonBuilder().setLabel('Next').setCustomId('debug.next').setStyle(discord_js_1.ButtonStyle.Success).setEmoji('➡'));
    constructor(name, execute, executeSlash) {
        this.name = name;
        this.execute = execute;
        this.executeSlash = executeSlash;
    }
}
exports.DebugProcess = DebugProcess;
//# sourceMappingURL=DebugProcess.js.map