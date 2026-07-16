import type {
  ScriptCallbacks,
  ScriptConfig,
  Statistics,
  TaskResult,
} from './types.ts';
import { MOCK_TASKS } from './mockData.ts';
import { getLastDayFormatted } from '../shared/utils/time.ts';
import { generateId } from '../shared/utils/id.ts';

export async function runStart(
  config: ScriptConfig,
  callbacks: ScriptCallbacks
): Promise<void> {
  const {
    onLog,
    onProgress,
    onTaskComplete,
    onComplete,
    delay,
    shouldAbort,
    waitWhilePaused,
  } = callbacks;

  const filteredTasks = MOCK_TASKS.filter((t) =>
    config.districts.includes(t.district)
  );

  const dateSent = getLastDayFormatted();
  const startTime = Date.now();
  let globalTaskIndex = 0;
  let successCount = 0;
  let skippedCount = 0;
  const errorCount = 0;
  const taskTimes: number[] = [];

  onProgress({
    totalTasks: filteredTasks.length,
    processedTasks: 0,
    progress: 0,
    successCount: 0,
    skippedCount: 0,
    errorCount: 0,
  });

  onLog('info', '🚀 Запуск скрипта автоматизации ЕДС Мосрег');
  onLog('info', `📋 Конфигурация: районы — ${config.districts.join(', ')}`);
  onLog('info', `📅 Дата для календаря: ${dateSent}`);

  await delay(800);
  onLog('info', '🌐 Открытие https://eds.mosreg.ru/');

  await delay(1200);
  onLog('info', '🔐 Клик по кнопке "Войти"');

  await delay(1500);
  onLog('info', `📝 Ввод логина: ${config.login}`);

  await delay(500);
  onLog('info', '📝 Ввод пароля: ●●●●●●●●');

  await delay(1000);
  onLog('success', '✅ Авторизация успешна');

  for (const district of config.districts) {
    if (shouldAbort()) break;
    await waitWhilePaused();

    onProgress({ currentDistrict: district });
    onLog('info', `🔍 Поиск по району: "${district}"`);

    await delay(1000);
    onLog('info', `📊 Сортировка по району: ${district}`);

    await delay(800);
    onLog('info', `🏷 Фильтрация по категории: ${config.category}`);

    await delay(600);

    const districtTasks = filteredTasks.filter((t) => t.district === district);
    onLog('info', `📋 Найдено заявок: ${districtTasks.length}`);

    for (const task of districtTasks) {
      if (shouldAbort()) break;
      await waitWhilePaused();

      const taskStartTime = Date.now();
      globalTaskIndex++;

      const progress = Math.round(
        (globalTaskIndex / filteredTasks.length) * 100
      );

      onProgress({
        currentTaskId: task.taskId,
        currentTaskIndex: globalTaskIndex,
        progress,
        processedTasks: globalTaskIndex,
      });

      onLog(
        'info',
        `📂 Открытие заявки ${task.taskId} (ID: ${task.edsId})`,
        `https://eds.mosreg.ru/claims/${task.edsId}`,
        task.taskId
      );
      onLog(
        'info',
        `📍 Адрес: ${task.address}, кв. ${task.apartment}`,
        undefined,
        task.taskId
      );
      await delay(config.delayMs * 0.5);

      const taskResult: TaskResult = {
        id: generateId(),
        taskId: task.taskId,
        edsId: task.edsId,
        district: task.district,
        address: task.address,
        apartment: task.apartment,
        status: task.hasPhone ? 'success' : 'skipped',
        message: task.hasPhone
          ? `Данные отправлены, дата: ${dateSent}`
          : 'По данной заявке со стороны УК информации предоставлено не было',
        timestamp: new Date().toISOString(),
        dateSent: task.hasPhone ? dateSent : undefined,
        processingTime: Date.now() - taskStartTime,
      };

      if (task.hasPhone) {
        onLog(
          'info',
          '📞 Обнаружен номер телефона в заявке',
          undefined,
          task.taskId
        );
        await delay(400);

        onLog('info', '📱 Ввод номера телефона', undefined, task.taskId);
        await delay(600);

        onLog('info', '📅 Открытие календаря', undefined, task.taskId);
        await delay(400);

        onLog('info', `📅 Выбор даты: ${dateSent}`, undefined, task.taskId);
        await delay(400);

        onLog('info', '✅ Выбор подтверждён', undefined, task.taskId);
        await delay(500);

        onLog('info', '📤 Отправка в МОГ', undefined, task.taskId);
        await delay(800);

        onLog(
          'success',
          `✅ Заявка ${task.taskId} — данные отправлены в МОГ`,
          undefined,
          task.taskId
        );

        successCount++;
      } else {
        onLog(
          'warn',
          `⚠️ Заявка ${task.taskId} — номер телефона не указан`,
          undefined,
          task.taskId
        );

        onLog(
          'warn',
          '📋 По данной заявке со стороны УК информации предоставлено не было',
          undefined,
          task.taskId
        );

        skippedCount++;
      }

      onTaskComplete(taskResult);

      const taskTime = Date.now() - taskStartTime;
      taskTimes.push(taskTime);

      onProgress({
        successCount,
        skippedCount,
        errorCount,
      });

      // Update estimated time
      if (taskTimes.length > 0) {
        const avgTime = taskTimes.reduce((a, b) => a + b, 0) / taskTimes.length;
        const remaining = filteredTasks.length - globalTaskIndex;
        onProgress({
          averageTaskTime: avgTime,
          estimatedTimeLeft: (remaining * avgTime) / 1000,
        });
      }

      await delay(config.delayMs * 0.3);
    }
  }

  const totalTime = Date.now() - startTime;

  if (shouldAbort()) {
    onLog('warn', '⛔ Скрипт остановлен пользователем');
  } else {
    onLog(
      'success',
      `🎉 Скрипт завершён! Обработано: ${filteredTasks.length}, Успешно: ${successCount}, Пропущено: ${skippedCount}`
    );
  }

  const stats: Statistics = {
    totalRuns: 1,
    totalTasks: filteredTasks.length,
    successTasks: successCount,
    skippedTasks: skippedCount,
    errorTasks: errorCount,
    lastRunDate: new Date().toISOString(),
    totalProcessingTime: totalTime,
    byDistrict: config.districts.reduce(
      (acc, d) => {
        const dt = filteredTasks.filter((t) => t.district === d);
        acc[d] = {
          total: dt.length,
          success: dt.filter((t) => t.hasPhone).length,
          skipped: dt.filter((t) => !t.hasPhone).length,
          error: 0,
        };

        return acc;
      },
      {} as Record<
        string,
        { total: number; success: number; skipped: number; error: number }
      >
    ),
  };

  onComplete(stats);
}
