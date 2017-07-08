export const fetchAllCollisions = data => (
  $.ajax({
    method: 'GET',
    url: '/api/collisions',
    data
  })
);

export const fetchCollision = (id) => (
  $.ajax({
    method: 'GET',
    url: `/api/collisions/${id}`
  })
);
