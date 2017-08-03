export const fetchAllCollisions = data => (
  $.ajax({
    method: 'GET',
    url: '/api/collisions',
    data
  })
);
