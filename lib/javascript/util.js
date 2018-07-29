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

export const fetchCollisions = (date) => {
  const url = `https://data.cityofnewyork.us/resource/qiz3-axqb.json?date=${date}T00:00:00.000`;
  const headers = new Headers({
    'X-App-Token': 'Vz2nbemWZ3Ttmz998p1ZUu0A3',
  });
  const myRequest = new Request(url, {
    method: 'GET',
    headers,
  });
  return fetch(myRequest)
    .then(response => response.json());
};
