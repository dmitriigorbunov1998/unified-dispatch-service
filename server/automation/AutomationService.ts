export interface AutomationStatus {
  isRunning: boolean;
  logs: string[];
}

type AutomationRunner = (addLog: (message: string) => void) => Promise<void>;
type Clock = () => Date;

const MAX_LOG_ENTRIES = 1_000;

export class AutomationService {
  private isRunning = false;
  private readonly logs: string[] = [];

  constructor(
    private readonly runner: AutomationRunner,
    private readonly clock: Clock = () => new Date()
  ) {}

  getStatus(): AutomationStatus {
    return { isRunning: this.isRunning, logs: [...this.logs] };
  }

  start(): boolean {
    if (this.isRunning) return false;

    this.isRunning = true;
    this.logs.length = 0;
    this.addLog('Получен запрос на запуск скрипта');

    void this.runner((message) => this.addLog(message))
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : String(error);
        this.addLog(`Ошибка выполнения: ${message}`);
      })
      .finally(() => {
        this.isRunning = false;
        this.addLog('Выполнение скрипта завершено');
      });

    return true;
  }

  clearLogs(): void {
    this.logs.length = 0;
  }

  private addLog(message: string): void {
    const timestamp = this.clock().toLocaleTimeString('ru-RU');
    this.logs.push(`[${timestamp}] ${message}`);

    if (this.logs.length > MAX_LOG_ENTRIES) {
      this.logs.splice(0, this.logs.length - MAX_LOG_ENTRIES);
    }

    console.log(`[${timestamp}] ${message}`);
  }
}
