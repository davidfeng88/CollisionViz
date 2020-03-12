export const DEFAULT_TIME = 480; // 08:00
export const START_TIME = 0; //  00:00
export const END_TIME = 1439; //  23:59

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

// '7:00' -> 420
export const timeStringToInt = (string) => {
  const array = string.split(':');
  const hour = parseInt(array[0], 10);
  const minute = parseInt(array[1], 10);
  return hour * 60 + minute;
};