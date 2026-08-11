import path from 'node:path';

import dotenv from 'dotenv';

import { AutomationService } from './automation/AutomationService';
import { runEdsAutomation } from './automation/runEdsAutomation';
import { getAllowedOrigins } from './config/automationConfig';
import { createApp } from './http/createApp';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const port = Number(process.env.PORT) || 3001;
const automationService = new AutomationService(runEdsAutomation);
const app = createApp({
  automationService,
  allowedOrigins: getAllowedOrigins(),
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
