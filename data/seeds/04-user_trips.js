
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_trips').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_trips').insert([
        {user_id: 1, trip_id: 1},
        {user_id: 1, trip_id: 2},
        {user_id: 2, trip_id: 1},
        {user_id: 3, trip_id: 2}
      ]);
    });
};
