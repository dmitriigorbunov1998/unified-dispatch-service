// ===== Типы конфигурации =====
export interface ScriptConfig {
  login: string;
  password: string;
  districts: string[];
  category: string;
  headless: boolean;
  delayMs: number;
}

// ===== Типы состояния скрипта =====
export interface ScriptState {
  isRunning: boolean;
  isPaused: boolean;
  currentDistrict: string;
  currentTaskId: string;
  currentTaskIndex: number;
  totalTasks: number;
  processedTasks: number;
  successCount: number;
  skippedCount: number;
  errorCount: number;
  progress: number;
  startTime: number | null;
  estimatedTimeLeft: number | null;
  averageTaskTime: number | null;
}

// ===== Типы результатов =====
export interface TaskResult {
  id: string;
  taskId: string;
  edsId: string;
  district: string;
  address: string;
  apartment: string;
  status: 'success' | 'skipped' | 'error';
  message: string;
  timestamp: string;
  dateSent?: string;
  processingTime: number;
}

// ===== Типы логов =====
export interface LogEntry {
  id: string;
  type: 'info' | 'success' | 'warn' | 'error';
  message: string;
  link?: string;
  taskId: string;
  timestamp: string;
}

// ==== Типы статистики =====
export interface Statistics {
  totalRuns: number;
  totalTasks: number;
  successTasks: number;
  skippedTasks: number;
  errorTasks: number;
  lastRunDate: string;
  totalProcessingTime: number;
  byDistrict: Record<string, DistrictsStats>;
}

export interface DistrictsStats {
  total: number;
  success: number;
  skipped: number;
  error: number;
}

// ===== Типы для колбэков скрипта =====
export interface ScriptCallbacks {
  onLog: (
    type: LogEntry['type'],
    message: string,
    link?: string,
    taskId?: string
  ) => void;
  onProgress: (updates: Partial<ScriptState>) => void;
  onTaskComplete: (task: TaskResult) => void;
  onComplete: (stats: Statistics) => void;
  delay: (ms: number) => Promise<void>;
  shouldAbort: () => boolean;
  waitWhilePaused: () => Promise<void>;
}

// ===== Типы для демо-данных =====
export interface MockTask {
  edsId: string;
  taskId: string;
  district: string;
  hasPhone: boolean;
  address: string;
  apartment: string;
}
