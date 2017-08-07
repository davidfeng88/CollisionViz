export const fetchAllCollisions = data => (
  $.ajax({
    method: 'GET',
    url: '/api/collisions',
    data
  })
);

export const fetchApiCollisions = (date) => {
  let url = `https://data.cityofnewyork.us/resource/qiz3-axqb.json?date=${date}T00:00:00.000`;
  let headers = new Headers({
    'X-App-Token': 'Vz2nbemWZ3Ttmz998p1ZUu0A3',
    // Accept: 'application/json',
  });
  let myRequest = new Request(url, {
    method: 'GET',
    headers: headers});
  return fetch(myRequest);
};


//
// export const fetchApiCollisions = (date) => (
//   $.ajax({
//       url: `https://data.cityofnewyork.us/resource/qiz3-axqb.json?date=${date}T00:00:00.000`,
//       type: "GET",
//       data: {
//         "$limit" : 5000,
//         "$$app_token" : "Vz2nbemWZ3Ttmz998p1ZUu0A3"
//       }
//   })
// );
