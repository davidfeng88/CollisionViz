export const DEFAULT_HOUR = 8; // 8AM

// '7:00' -> 7
export const timeStringToHour = (string) => {
  const array = string.split(':');
  const hour = parseInt(array[0], 10);
  return hour;
};
