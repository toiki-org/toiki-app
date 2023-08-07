import { ButtonInteraction, Client, TextChannel } from 'discord.js';
import { isInteractionOwner } from '../../../utils/isInteractionOwner';

export const deleteHandler = async (
  client: Client<boolean>,
  interaction: ButtonInteraction
) => {
  if (!(await isInteractionOwner(interaction))) {
    return;
  }
  if (!interaction.guildId) {
    return;
  }
  const guild = client.guilds.cache.get(interaction.guildId);
  const channel = guild?.channels.cache.get(interaction.channelId);
  if (!(channel instanceof TextChannel)) {
    return;
  }
  const message = channel.messages.cache.get(interaction.message.id);
  if (!message) return;
  await message.delete();
};
