export const fetchCollisions = (date) => {
  let url = `https://data.cityofnewyork.us/resource/qiz3-axqb.json?date=${date}T00:00:00.000`;
  let headers = new Headers({
    'X-App-Token': 'Vz2nbemWZ3Ttmz998p1ZUu0A3',

  });
  let myRequest = new Request(url, {
    method: 'GET',
    headers: headers});
  return fetch(myRequest).then( response => response.json());
};
