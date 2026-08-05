import { requestJson } from '@/shared/api/http';

export interface AutomationStatus {
  isRunning: boolean;
  logs: string[];
}

type MessageResponse = {
  message?: string;
};

export const automationApi = {
  getStatus: () => requestJson<AutomationStatus>('/api/automation/status'),

  start: () =>
    requestJson<MessageResponse>('/api/automation/start', {
      method: 'POST',
    }),

  clearLogs: () =>
    requestJson<MessageResponse>('/api/automation/logs', {
      method: 'DELETE',
    }),
};
