const parseTime = (totalMinutes) => {
  let hours = Math.floor(totalMinutes / 60).toString();
  // if (hours.length === 1) {
  //   hours = `0${hours}`;
  // }
  let minutes = (totalMinutes % 60).toString();
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
};

export default parseTime;
