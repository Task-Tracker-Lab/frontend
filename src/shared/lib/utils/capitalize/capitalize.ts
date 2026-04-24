export const capitalize = (value: string) =>
  value ? value[0].toUpperCase() + value.slice(1).toLowerCase() : value;
