
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('expenses').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('expenses').insert([
        {name: 'Plane tickets', price: 650, trip_id: 1},
        {name: 'Resort Stay', price: 250, trip_id: 1},
        {name: 'Plane tickets', price: 850, trip_id: 2}
      ])
    });
};
