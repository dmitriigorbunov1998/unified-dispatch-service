import path from 'node:path';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';

import { runEdsAutomation } from './automation/runEdsAutomation';

dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
});

interface AutomationStatusResponse {
  isRunning: boolean;
  logs: string[];
}

interface MessageResponse {
  message: string;
}

const app = express();

const port = Number(process.env.PORT) || 3001;

let isRunning = false;

const logs: string[] = [];

app.use(cors());
app.use(express.json());

function addLog(message: string): void {
  const timestamp = new Date().toLocaleTimeString('ru-RU');

  logs.push(`[${timestamp}] ${message}`);

  console.log(`[${timestamp}] ${message}`);
}

app.get(
  '/api/automation/status',
  (_request: Request, response: Response<AutomationStatusResponse>) => {
    response.status(200).json({
      isRunning,
      logs,
    });
  }
);

app.post(
  '/api/automation/start',
  (_request: Request, response: Response<MessageResponse>) => {
    if (isRunning) {
      response.status(409).json({
        message: 'Скрипт уже выполняется',
      });

      return;
    }

    isRunning = true;
    logs.length = 0;

    addLog('Получен запрос на запуск скрипта');

    response.status(202).json({
      message: 'Скрипт запущен',
    });

    void runEdsAutomation(addLog)
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : String(error);

        addLog(`Ошибка выполнения: ${message}`);
      })
      .finally(() => {
        isRunning = false;

        addLog('Выполнение скрипта завершено');
      });
  }
);

app.delete(
  '/api/automation/logs',
  (_request: Request, response: Response<MessageResponse>) => {
    logs.length = 0;

    response.status(200).json({
      message: 'Логи очищены',
    });
  }
);

app.get(
  '/api/health',
  (_request: Request, response: Response<MessageResponse>) => {
    response.status(200).json({
      message: 'Сервер работает',
    });
  }
);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
