import * as yup from 'yup';
import { isYoutubeOrSpotify } from 'toiki-common';
import { convertUrl } from '../../api/convertUrl';
import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { interactionButtons } from '../interactions';

export const processUrl = async (url: string) => {
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

  return {
    content: `Here's a ${type} link for the ${adjective}:\n\n${convertedUrl}`,
    components: [buttons]
  };
};
