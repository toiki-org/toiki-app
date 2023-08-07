export * from './delete/handler';
export * from './deleteAndReport/handler';

import { deleteButton } from './delete/button';
import { deleteAndReportButton } from './deleteAndReport/button';

export const interactionButtons = [deleteButton, deleteAndReportButton];
