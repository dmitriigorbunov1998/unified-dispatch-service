/**
 * Возвращает последний день предыдущего месяца в формате ДД.ММ.ГГГГ
 * Используется для выбора даты в календаре ЕДС Мосрег
 */
export function getLastDayFormatted(): string {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const day = String(lastMonth.getDate()).padStart(2, '0');
  const month = String(lastMonth.getMonth() + 1).padStart(2, '0');
  const year = String(lastMonth.getFullYear()).slice(-2);

  return `${day}.${month}.${year}`;
}

/**
 * Форматирует секунды в читаемый формат: 1ч 23м 45с
 */
export function formatTime(seconds: number): string {
  if (seconds < 0) return '0c';
  if (seconds < 60) return `${Math.round(seconds)}c`;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}ч`);
  if (minutes > 0) parts.push(`${minutes}м`);
  if (secs > 0 || parts.length < 1) parts.push(`${secs}с`);

  return parts.join(' ');
}
