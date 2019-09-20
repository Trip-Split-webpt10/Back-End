
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {user_id: 1, expense_id: 1, amount: 650},
        {user_id: 1, expense_id: 2, amount: 50},
        {user_id: 2, expense_id: 2, amount: 200},
        {user_id: 3, expense_id: 3, amount: 550},
        {user_id: 1, expense_id: 3, amount: 300}
      ]);
    });
};
