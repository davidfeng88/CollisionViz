export const fetchAllCollisions = data => (
  $.ajax({
    method: 'GET',
    url: '/api/collisions',
    data
  })
);

export const fetchCollisions = () => (
  $.ajax({
      url: "https://data.cityofnewyork.us/resource/qiz3-axqb.json",
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
