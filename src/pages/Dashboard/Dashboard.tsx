import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { useHeader } from '@/hooks/useHeader.ts';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ListChecks,
  XCircle,
  Zap,
} from 'lucide-react';
import type { ComponentProps } from 'react';
import './Dashboard.css';
import { StatsCard } from '../../components/StatsCard/StatsCard';
import { useTranslation } from '@/i18n';

type AutomationStatus = {
  isRunning: boolean;
  logs: string[];
};

type MessageResponse = {
  message?: string;
};

export function Dashboard() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState('dashboard');
  const headerProps = useHeader();

  const { t } = useTranslation();

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const getAutomationStatus = async (): Promise<void> => {
      try {
        const response = await fetch('/api/automation/status');

        if (!response.ok) {
          setError(t('Не удалось получить статус скрипта'));
          setIsRunning(false);

          return;
        }

        const status: AutomationStatus = await response.json();

        setLogs(status.logs);
        setIsRunning(status.isRunning);
      } catch (requestError) {
        const message =
          requestError instanceof Error
            ? requestError.message
            : 'Неизвестная ошибка';

        setError(message);
        setIsRunning(false);
      }
    };

    void getAutomationStatus();

    const intervalId = window.setInterval(() => {
      void getAutomationStatus();
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning, t]);

  const handleStart = async (): Promise<void> => {
    setError(null);
    setLogs([]);
    setIsRunning(true);

    try {
      const response = await fetch('/api/automation/start', {
        method: 'POST',
      });

      if (response.ok) {
        return;
      }

      const data: MessageResponse = await response.json();

      setError(data.message ?? 'Не удалось запустить авторизацию');

      setIsRunning(false);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'Неизвестная ошибка';

      setError(message);
      setIsRunning(false);
    }
  };

  const headerComponentProps: ComponentProps<typeof Header> = {
    ...headerProps,
    activeTab,
    onTabChange: setActiveTab,
  };

  return (
    <div className="app">
      <Header {...headerComponentProps} />

      <main className="app-main">
        <div className="dashboard">
          {/* Hero Banner */}
          <div className="dashboard-hero">
            <div>
              <h1 className="dashboard-hero-title">Добро пожаловать 👋</h1>
              <p className="dashboard-hero-desc">
                Прокрутите страницу вниз, чтобы увидеть iOS-style progressive
                blur на header. А при нажатии кнопки ниже вкладки навигации
                плавно анимируются во второй ряд без фона с эффектом матового
                стекла!
              </p>
            </div>
            <div className="dashboard-hero-controls">
              <div className="dashboard-status-badge">
                <Zap size={16} /> Система активна
              </div>
            </div>
          </div>

          <button type="button" disabled={isRunning} onClick={handleStart}>
            {isRunning ? 'Скрипт выполняется...' : 'Запустить скрипт'}
          </button>

          {error && <p>Ошибка: {error}</p>}

          <section>
            <div>Логи</div>
          </section>

          <div>
            {logs.length === 0 ? (
              <div>Логи пока отсутствуют</div>
            ) : (
              logs.map((log, index) => <p key={`${index}-${log}`}>{log}</p>)
            )}
          </div>

          <div className="dashboard-stats">
            <StatsCard
              title={t('dashboard.stats.total')}
              icon={<ListChecks size={20} />}
              color="blue"
            />
            <StatsCard
              title={t('dashboard.stats.success')}
              icon={<CheckCircle2 />}
              color="green"
            />
            <StatsCard
              title={t('dashboard.stats.skipped')}
              icon={<AlertTriangle />}
              color="yellow"
            />
            <StatsCard
              title={t('dashboard.stats.errors')}
              icon={<XCircle />}
              color="red"
            />
            <StatsCard
              title={t('dashboard.stats.session')}
              icon={<Clock />}
              color="cyan"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
