const twoDigitFormatter = new Intl.NumberFormat('ru-RU', {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

export function formatTime(valueMs: number) {
  const totalSeconds = Number.isFinite(valueMs) ? Math.max(0, Math.ceil(valueMs / 1000)) : 0;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${twoDigitFormatter.format(minutes)}:${twoDigitFormatter.format(seconds)}`;
}
