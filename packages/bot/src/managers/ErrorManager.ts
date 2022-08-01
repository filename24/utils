import { AutocompleteInteraction, Colors, EmbedBuilder, Guild, Interaction, Message, WebhookClient } from 'discord.js';
import BaseManager from './BaseManager';
import { Logger } from '@anhgerel/logger';
import { v4 } from 'uuid';
import { BotClient } from '../structures/BotClient';

export interface ErrorReportOptions {
  executer: Message | Interaction | undefined;
  isSend?: boolean;
}

export class ErrorManager extends BaseManager {
  private logger: Logger;

  public constructor(client: BotClient) {
    super(client);

    this.logger = new Logger('bot');
  }

  public report(error: Error, options?: ErrorReportOptions) {
    this.logger.error(error.stack as string);

    const date = (Number(new Date()) / 1000) | 0;
    const errorText = `**[<t:${date}:T> ERROR]** ${error.stack}`;
    const errorCode = v4();
    if (options?.executer instanceof AutocompleteInteraction) return;

    this.client.errors.set(errorCode, error.stack as string);

    const errorEmbed = new EmbedBuilder()
      .setTitle('오류가 발생했습니다.')
      .setDescription('명령어 실행 도중에 오류가 발생하였습니다. 개발자에게 오류코드를 보내 개발에 지원해주세요.')
      .addFields([{ name: '오류 코드', value: errorCode, inline: true }])
      .setColor(Colors.Red);

    options && options.isSend
      ? // @ts-ignore
        options.executer?.reply({ embeds: [errorEmbed] })
      : null;

    if (this.client.config.report.type == 'webhook') {
      const webhook = new WebhookClient({
        url: this.client.config.report.webhook.url,
      });

      webhook.send(errorText);
    } else if (this.client.config.report.type == 'text') {
      const guild = this.client.guilds.cache.get(this.client.config.report.text.guildID) as Guild;
      const channel = guild.channels.cache.get(this.client.config.report.text.channelID);

      if (!channel?.isTextBased()) return new TypeError('Channel is not text channel');

      channel.send(errorText);
    }
  }
}
