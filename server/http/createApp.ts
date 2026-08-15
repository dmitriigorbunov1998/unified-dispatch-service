import cors from 'cors';
import express from 'express';
import type { Request, Response } from 'express';

import type {
  AutomationService,
  AutomationStatus,
} from '../automation/AutomationService';

interface MessageResponse {
  message: string;
}

interface CreateAppOptions {
  automationService: AutomationService;
  allowedOrigins: readonly string[];
}

export function createApp({
  automationService,
  allowedOrigins,
}: CreateAppOptions) {
  const app = express();

  app.disable('x-powered-by');
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error('Origin is not allowed'));
      },
    })
  );
  app.use(express.json({ limit: '16kb' }));

  app.get(
    '/api/automation/status',
    (_request: Request, response: Response<AutomationStatus>) => {
      response.status(200).json(automationService.getStatus());
    }
  );

  app.post(
    '/api/automation/start',
    (_request: Request, response: Response<MessageResponse>) => {
      if (!automationService.start()) {
        response.status(409).json({ message: 'Скрипт уже выполняется' });
        return;
      }

      response.status(202).json({ message: 'Скрипт запущен' });
    }
  );

  app.delete(
    '/api/automation/logs',
    (_request: Request, response: Response<MessageResponse>) => {
      automationService.clearLogs();
      response.status(200).json({ message: 'Логи очищены' });
    }
  );

  app.get(
    '/api/health',
    (_request: Request, response: Response<MessageResponse>) => {
      response.status(200).json({ message: 'Сервер работает' });
    }
  );

  return app;
}
