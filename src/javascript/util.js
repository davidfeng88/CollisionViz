export const DEFAULT_HOUR = 8; // 8AM

// 420 -> '07:00'
export const timeIntToString = (totalMinutes) => {
  let hours = Math.floor(totalMinutes / 60)
    .toString();
  if (hours.length === 1) {
    hours = `0${hours}`;
  }
  let minutes = (totalMinutes % 60)
    .toString();
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
};

// '7:00' -> 7
export const timeStringToHour = (string) => {
  const array = string.split(':');
  const hour = parseInt(array[0], 10);
  return hour;
};
