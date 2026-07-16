/**
 * Форматирует число с разделителями тысяч
 * 1234567 → 1 234 567
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('ru-RU');
}

/**
 * Вычисляет процент и возвращает строку с одним знаком после запятой
 * (50 / 200) * 100 → "25.0%"
 */
export function formatPercent(value: number, total: number): string {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(1)}%`;
}
