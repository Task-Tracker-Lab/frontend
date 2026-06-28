export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export function isHexColor(value: string): boolean {
  return HEX_COLOR_REGEX.test(value);
}
