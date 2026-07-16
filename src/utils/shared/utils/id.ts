let counter = 0;

/**
 * Генерирует уникальный ID для задач и логов
 */
export function generateId(): string {
  counter++;
  return `${Date.now()}-${counter}-${Math.random().toString(36).slice(2, 9)}`;
}
