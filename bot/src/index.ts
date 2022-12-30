import 'dotenv/config';
import * as yup from 'yup';
import {
  ActionRowBuilder,
  BaseGuildTextChannel,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  Emoji,
  Events,
  GatewayIntentBits,
  TextChannel
} from 'discord.js';
import { isYoutubeOrSpotify } from './utils/isYoutubeOrSpotify';
import { convertUrl } from './api/convertUrl';
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const token = process.env.TOKEN;

console.log('Bot is starting...');
client.on('ready', () => {
  console.log('Bot is running!');

  client.on('messageCreate', async (message) => {
    try {
      if (message.author.bot) return;

      if (!message.guildId) return;

      const url = message.content;

      const isValid = yup
        .object()
        .shape({
          url: yup.string().required().url()
        })
        .isValidSync({
          url
        });

      if (!isValid) return;

      const urlMatchResult = isYoutubeOrSpotify(url);

      if (!urlMatchResult) return;

      const convertedUrl = await convertUrl(url);

      const type = urlMatchResult.type === 'spotify' ? 'youtube' : 'spotify';
      const adjective = type === 'youtube' ? 'plebs' : 'gentlemen';

      const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId('delete')
          .setLabel('Delete?')
          .setStyle(ButtonStyle.Danger)
      );

      await message.reply({
        content: `Here's a ${type} link for the ${adjective}: ${convertedUrl}`,
        components: [buttons]
      });
    } catch (e) {
      console.error(e);
    }
  });

  client.on('interactionCreate', async (interaction) => {
    if (!(interaction instanceof ButtonInteraction)) {
      return;
    }
    if (interaction.customId !== 'delete') {
      return;
    }
    if (
      interaction.member?.user.id !==
      interaction.message.mentions.members?.at(0)?.id
    ) {
      await interaction.reply({
        content:
          'Only the user that sent the link can ask for this message to be deleted.',
        ephemeral: true
      });
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
  });
});

client.login(token);
