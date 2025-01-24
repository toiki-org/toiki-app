import 'dotenv/config';
import { ButtonInteraction, Client, GatewayIntentBits, REST } from 'discord.js';
import { deleteAndReportHandler, deleteHandler } from './lib/interactions';
import { setupCommands } from './lib/rest';
import { commands } from './lib/commands';
import { processUrl } from './lib/core/processUrl';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const token = process.env.TOKEN;

const rest = new REST({ version: '10' }).setToken(token);

console.log('Bot is starting...');
client.on('ready', () => {
  console.log('Bot is running!');

  setupCommands(rest, client.application!.id);

  client.on('messageCreate', async (message) => {
    try {
      if (message.author.bot) return;

      if (!message.guildId) return;

      const res = await processUrl(message.content);

      if (res === undefined) return;

      await message.reply(res);
    } catch (e) {
      console.error(e);
    }
  });

  client.on('interactionCreate', async (interaction) => {
    if (interaction.isMessageContextMenuCommand()) {
      if (interaction.commandName === commands.convertUrl.name) {
        const res = await processUrl(interaction.targetMessage.content);

        if (res === undefined) return;

        await interaction.reply(res);
      }

      return;
    }
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
