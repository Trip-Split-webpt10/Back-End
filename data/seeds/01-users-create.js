
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Chris Test', username: 'chris', password: 'password'},
        {name: 'User Test', username: 'username', password: 'password'},
        {name: 'John Doe', username: 'john', password: 'password'}
      ]);
    });
};
