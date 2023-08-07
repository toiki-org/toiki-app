import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const deleteButton = new ButtonBuilder()
  .setCustomId('delete')
  .setLabel('Delete?')
  .setStyle(ButtonStyle.Danger);
