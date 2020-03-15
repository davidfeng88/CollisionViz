const API_ENDPOINT = 'https://data.cityofnewyork.us/resource/h9gi-nx95.json';
const API_DATE_FIELD_NAME = 'crash_date';
const API_TOKEN = 'Vz2nbemWZ3Ttmz998p1ZUu0A3';
const API_TIME_FIELD_NAME = 'crash_time';

const isCollisionValid = collision => (
  collision && collision.latitude && collision.longitude && collision[API_TIME_FIELD_NAME]);

export const fetchCollisionsFromApi = (date) => {
  const url = `${API_ENDPOINT}?${API_DATE_FIELD_NAME}=${date}T00:00:00.000`;
  const headers = new Headers({
    'X-App-Token': API_TOKEN,
  });
  const req = new Request(url, {
    method: 'GET',
    headers,
  });
  return fetch(req).then(res => res.json())
    .then(collisionsData => collisionsData.filter(isCollisionValid));
};

export const getCollisionHour = (collision) => {
  const timeString = collision[API_TIME_FIELD_NAME]; // e.g. '7:00'
  const array = timeString.split(':');
  const hour = parseInt(array[0], 10);
  return hour; // e.g. 7
};

export const API_LINK = 'https://dev.socrata.com/foundry/data.cityofnewyork.us/h9gi-nx95';
