import 'dotenv/config';
import * as yup from 'yup';
import { Client, Events, GatewayIntentBits } from 'discord.js';
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

  client.on('messageCreate', (message) => {
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

      convertUrl(url).then((convertedUrl) => {
        const type = urlMatchResult.type === 'spotify' ? 'youtube' : 'spotify';
        const adjective = type === 'youtube' ? 'gentlemen' : 'plebs';
        message.reply(
          `Here's a ${type} link for the ${adjective}: ${convertedUrl}`
        );
      });
    } catch (e) {
      console.error(e);
    }
  });
});

client.login(token);
