import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';

export const convertUrlContextCommand = new ContextMenuCommandBuilder()
  .setName('Convert URL')
  .setType(ApplicationCommandType.Message);
