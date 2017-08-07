export const fetchAllCollisions = data => (
  $.ajax({
    method: 'GET',
    url: '/api/collisions',
    data
  })
);

export const fetchCollisions = (date) => () => {
  let url = `https://data.cityofnewyork.us/resource/qiz3-axqb.json?date=${date}T00:00:00.000`;
  return(
    $.ajax({
        url: url,
        type: "GET",
        data: {
          "$limit" : 5000,
          "$$app_token" : "Vz2nbemWZ3Ttmz998p1ZUu0A3"
        }
    }).then((data) => {
      alert("Retrieved " + data.length + " records from the dataset!");
      console.log(data);
    })
  );
};

// thoughts: returned value is an Array, can convert to
// 1. a JSON object, indexed by unique keys
// collisions: { 123456: { details}, 654321: {details}, ... }
// 2. time index
// { "00:00": [123456, 123458, ...], "00:01": [...], ... }
// 2.1 need to write a function to calculate: next minute
// update map markers is : delete last minute, add new minute
