
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_expenses').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_expenses').insert([
        {user_id: 1, expense_id: 1, amount: 650},
        {user_id: 1, expense_id: 2, amount: 50},
        {user_id: 2, expense_id: 2, amount: 200},
        {user_id: 3, expense_id: 3, amount: 550},
        {user_id: 1, expense_id: 3, amount: 300}
      ]);
    });
};
