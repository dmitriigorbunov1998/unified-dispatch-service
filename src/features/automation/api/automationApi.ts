import { requestJson } from '@/shared/api/http';
import { getApiUrl } from '@/shared/config/env';

export interface AutomationStatus {
  isRunning: boolean;
  logs: string[];
}

type MessageResponse = {
  message?: string;
};

function parseAutomationStatus(value: unknown): AutomationStatus {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('isRunning' in value) ||
    typeof value.isRunning !== 'boolean' ||
    !('logs' in value) ||
    !Array.isArray(value.logs) ||
    !value.logs.every((log) => typeof log === 'string')
  ) {
    throw new TypeError('Invalid automation status response');
  }

  return {
    isRunning: value.isRunning,
    logs: value.logs,
  };
}

export const automationApi = {
  getStatus: () =>
    requestJson<AutomationStatus>(
      getApiUrl('/api/automation/status'),
      undefined,
      parseAutomationStatus
    ),

  start: () =>
    requestJson<MessageResponse>(getApiUrl('/api/automation/start'), {
      method: 'POST',
    }),

  clearLogs: () =>
    requestJson<MessageResponse>(getApiUrl('/api/automation/logs'), {
      method: 'DELETE',
    }),
};
