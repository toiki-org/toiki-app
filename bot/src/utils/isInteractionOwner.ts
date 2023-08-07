import { ButtonInteraction } from 'discord.js';

export const isInteractionOwner = async (interaction: ButtonInteraction) => {
  if (
    interaction.member?.user.id !==
    interaction.message.mentions.members?.at(0)?.id
  ) {
    await interaction.reply({
      content:
        'Only the user that sent the link can ask for this message to be deleted.',
      ephemeral: true
    });
    return false;
  }
  return true;
};
