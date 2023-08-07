import { ButtonInteraction, Client, Guild, TextChannel } from 'discord.js';
import { deleteHandler } from '../delete/handler';

export const deleteAndReportHandler = async (
  client: Client<boolean>,
  interaction: ButtonInteraction
) => {
  await deleteHandler(client, interaction);
  const homeGuild = client.guilds.cache.get(process.env.HOME_GUILD_ID!);
  if (!(homeGuild instanceof Guild)) {
    return console.warn('Could not send report: home guild is invalid');
  }
  const reportChannel = homeGuild.channels.cache.get(
    process.env.REPORT_CHANNEL_ID!
  );
  if (!(reportChannel instanceof TextChannel)) {
    return console.warn('Could not send report: report channel is not valid');
  }
  const url = interaction.message.content.split('\n')[2];
  let queryUrl = 'N/A';
  const queryMessageId = interaction.message.reference;
  if (queryMessageId?.messageId) {
    const queryMessage = interaction.message.channel.messages.cache.get(
      queryMessageId.messageId
    );
    queryUrl = queryMessage?.content ?? 'N/A';
  }
  await reportChannel.send({
    content: `An URL has been reported to be invalid: ${url}\n\nOriginal URL: ${queryUrl}`
  });
};
