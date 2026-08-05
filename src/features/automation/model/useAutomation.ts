import { useCallback, useEffect, useState } from 'react';

import { automationApi } from '../api/automationApi';
import { getErrorMessage } from '@/shared/lib/errors/getErrorMessage';

interface AutomationMessages {
  clearError: string;
  startError: string;
  statusError: string;
}

export interface AutomationModel {
  error: string | null;
  isClearingLogs: boolean;
  isRunning: boolean;
  logs: string[];
  clearLogs: () => Promise<void>;
  start: () => Promise<void>;
}

export function useAutomation(messages: AutomationMessages): AutomationModel {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isClearingLogs, setIsClearingLogs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshStatus = useCallback(async (): Promise<void> => {
    try {
      const status = await automationApi.getStatus();

      setLogs(status.logs);
      setIsRunning(status.isRunning);
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, messages.statusError));
      setIsRunning(false);
    }
  }, [messages.statusError]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void refreshStatus();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [refreshStatus]);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      void refreshStatus();
    }, 1_000);

    return () => window.clearInterval(intervalId);
  }, [isRunning, refreshStatus]);

  const start = useCallback(async (): Promise<void> => {
    setError(null);
    setLogs([]);
    setIsRunning(true);

    try {
      await automationApi.start();
      await refreshStatus();
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, messages.startError));
      setIsRunning(false);
    }
  }, [messages.startError, refreshStatus]);

  const clearLogs = useCallback(async (): Promise<void> => {
    setIsClearingLogs(true);
    setError(null);

    try {
      await automationApi.clearLogs();
      setLogs([]);
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, messages.clearError));
    } finally {
      setIsClearingLogs(false);
    }
  }, [messages.clearError]);

  return {
    error,
    isClearingLogs,
    isRunning,
    logs,
    clearLogs,
    start,
  };
}
