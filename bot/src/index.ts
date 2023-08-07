import 'dotenv/config';
import * as yup from 'yup';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  GatewayIntentBits,
  TextChannel
} from 'discord.js';
import { isYoutubeOrSpotify } from './utils/isYoutubeOrSpotify';
import { convertUrl } from './api/convertUrl';
import {
  deleteAndReportHandler,
  deleteHandler,
  interactionButtons
} from './lib/interactions';
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
        ...interactionButtons
      );

      await message.reply({
        content: `Here's a ${type} link for the ${adjective}:\n\n${convertedUrl}`,
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
    if (!['delete', 'deleteAndReport'].includes(interaction.customId)) {
      return;
    }
    switch (interaction.customId) {
      case 'delete':
        return deleteHandler(client, interaction);
      case 'deleteAndReport':
        return deleteAndReportHandler(client, interaction);
    }
  });
});

client.login(token);
