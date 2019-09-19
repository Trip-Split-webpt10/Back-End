
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trips').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('trips').insert([
        {destination: 'Hawaii', complete: false},
        {destination: 'Japan', complete: false}
      ]);
    });
};
