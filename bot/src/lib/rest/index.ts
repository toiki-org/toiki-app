import { REST, Routes } from 'discord.js';
import { commands } from '../commands';

export const setupCommands = async (rest: REST, applicationId: string) => {
  console.log('Started refreshing application (/) commands.');

  try {
    await rest.put(Routes.applicationCommands(applicationId), {
      body: Object.values(commands)
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};
