"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorManager = void 0;
const discord_js_1 = require("discord.js");
const BaseManager_1 = __importDefault(require("./BaseManager"));
const logger_1 = require("@anhgerel/logger");
const uuid_1 = require("uuid");
class ErrorManager extends BaseManager_1.default {
    logger;
    constructor(client) {
        super(client);
        this.logger = new logger_1.Logger('bot');
    }
    report(error, options) {
        this.logger.error(error.stack);
        const date = (Number(new Date()) / 1000) | 0;
        const errorText = `**[<t:${date}:T> ERROR]** ${error.stack}`;
        const errorCode = (0, uuid_1.v4)();
        if (options?.executer instanceof discord_js_1.AutocompleteInteraction)
            return;
        this.client.errors.set(errorCode, error.stack);
        const errorEmbed = new discord_js_1.EmbedBuilder()
            .setTitle('오류가 발생했습니다.')
            .setDescription('명령어 실행 도중에 오류가 발생하였습니다. 개발자에게 오류코드를 보내 개발에 지원해주세요.')
            .addFields([{ name: '오류 코드', value: errorCode, inline: true }])
            .setColor(discord_js_1.Colors.Red);
        options && options.isSend
            ? // @ts-ignore
                options.executer?.reply({ embeds: [errorEmbed] })
            : null;
        if (this.client.config.report.type == 'webhook') {
            const webhook = new discord_js_1.WebhookClient({
                url: this.client.config.report.webhook.url,
            });
            webhook.send(errorText);
        }
        else if (this.client.config.report.type == 'text') {
            const guild = this.client.guilds.cache.get(this.client.config.report.text.guildID);
            const channel = guild.channels.cache.get(this.client.config.report.text.channelID);
            if (!channel?.isTextBased())
                return new TypeError('Channel is not text channel');
            channel.send(errorText);
        }
    }
}
exports.ErrorManager = ErrorManager;
//# sourceMappingURL=ErrorManager.js.map