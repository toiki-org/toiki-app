import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const deleteAndReportButton = new ButtonBuilder()
  .setCustomId('deleteAndReport')
  .setLabel('Delete and report wrong link?')
  .setStyle(ButtonStyle.Danger);
