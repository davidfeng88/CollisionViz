const API_ENDPOINT = 'https://data.cityofnewyork.us/resource/h9gi-nx95.json';
export const API_LINK = 'https://dev.socrata.com/foundry/data.cityofnewyork.us/h9gi-nx95';
const API_DATE_FIELD_NAME = 'crash_date';
const API_TOKEN = 'Vz2nbemWZ3Ttmz998p1ZUu0A3';

export const API_TIME_FIELD_NAME = 'crash_time';

export const fetchCollisionsFromApi = (date) => {
  const url = `${API_ENDPOINT}?${API_DATE_FIELD_NAME}=${date}T00:00:00.000`;
  const headers = new Headers({
    'X-App-Token': API_TOKEN,
  });
  const req = new Request(url, {
    method: 'GET',
    headers,
  });
  return fetch(req)
    .then(res => res.json());
};
