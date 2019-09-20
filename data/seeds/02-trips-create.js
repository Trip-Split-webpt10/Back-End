
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trips').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('trips').insert([
        {destination: 'Hawaii', complete: false, start_date: "2019-12-10", end_date: "2019-12-17"},
        {destination: 'Japan', complete: false, start_date: "2020-01-14", end_date: "2020-01-28"}
      ]);
    });
};
