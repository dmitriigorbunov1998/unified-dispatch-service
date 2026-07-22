import 'dotenv/config';

import cors from 'cors';
import express, { type Request, type Response } from 'express';

import { runEdsAutomation } from './automation/runEdsAutomation';

type AutomationStatusResponse = {
  isRunning: boolean;
  logs: string[];
};

type MessageResponse = {
  message: string;
};

const app = express();
const port = 3001;

let isRunning = false;
let logs: string[] = [];

app.use(cors());
app.use(express.json());

function addLog(message: string): void {
  const time = new Date().toLocaleTimeString('ru-RU');
  const logMessage = `[${time}] ${message}]`;

  logs.push(logMessage);
  console.log(logMessage);
}

app.post(
  '/api/automation/start',
  async (
    _request: Request,
    response: Response<MessageResponse>
  ): Promise<void> => {
    if (isRunning) {
      response.status(409).json({
        message: 'Автоматизация уже запущена',
      });

      return;
    }

    isRunning = true;
    logs = [];

    addLog('Получена команда на запуск');

    response.status(202).json({
      message: 'Автоматизация запущена',
    });

    try {
      await runEdsAutomation(addLog);

      addLog('Скрипт успешно завершён');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Неизвестная ошибка';

      addLog(`Скрипт завершился с ошибкой: ${message}`);
    } finally {
      isRunning = false;
    }
  }
);

app.get(
  '/api/automation/status',
  (_request: Request, response: Response<AutomationStatusResponse>): void => {
    response.json({
      isRunning: true,
      logs,
    });
  }
);

app.listen(port, () => {
  console.log(`Backend запущен: http://localhost:${port}`);
});
