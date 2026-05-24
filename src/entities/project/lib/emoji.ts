const ICON_CODE_PATTERN = /^[\dA-F]+(?:-[\dA-F]+)*$/i;

export function projectIconCodeToEmoji(code: string | null | undefined): string {
  if (!code) return '';
  if (!ICON_CODE_PATTERN.test(code)) return code;

  const codePoints = code
    .split('-')
    .map((part) => Number.parseInt(part, 16))
    .filter((value) => Number.isFinite(value));

  if (!codePoints.length) return '';

  try {
    return String.fromCodePoint(...codePoints);
  } catch {
    return '';
  }
}
