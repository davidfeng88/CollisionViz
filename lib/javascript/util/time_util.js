// 420 -> "7:00" or "07:00"
export const timeIntToString = (totalMinutes, withPadding=false) => {
  let hours = Math.floor(totalMinutes / 60).toString();
  if (withPadding && hours.length === 1) {
    hours = `0${hours}`;
  }
  let minutes = (totalMinutes % 60).toString();
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
};

// "7:00" -> 420
export const timeStringToInt = (string) => {
  let array = string.split(":");
  let hour = parseInt(array[0]);
  let minute = parseInt(array[1]);
  return hour * 60 + minute;
};
