import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Message } from 'discord.js';
import { DebugProcessFunction } from '../../types';

export class DebugProcess {
  public static buttons: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setLabel('Previous')
        .setCustomId('debug.previous')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('⬅'),
    )
    .addComponents(
      new ButtonBuilder()
        .setLabel('0/1 page')
        .setDisabled(true)
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('debug.pages'),
    )
    .addComponents(
      new ButtonBuilder().setLabel('Stop').setCustomId('debug.stop').setStyle(ButtonStyle.Danger).setEmoji('⛔'),
    )
    .addComponents(
      new ButtonBuilder().setLabel('Next').setCustomId('debug.next').setStyle(ButtonStyle.Success).setEmoji('➡'),
    );
  constructor(
    public name: string,
    public execute: DebugProcessFunction<Message>,
    public executeSlash?: DebugProcessFunction<ChatInputCommandInteraction>,
  ) {}
}
