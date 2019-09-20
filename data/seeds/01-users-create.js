
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Chris Test', username: 'chris', password: '$2a$10$d6FbScul1zrlWZNTE5HYDOGm9T3fMg5mfbKVnXbiz60SA1vXFJ9HK'},
        {name: 'User Test', username: 'username', password: '$2a$10$Vq.BFt9GRvH9YUN8G/R/A.KovtLpPEZW/mooFtOMpUl3fpQi3YWim'},
        {name: 'John Doe', username: 'john', password: '$2a$10$0b.SWt3Hc86mz17pNEcP7.IKlLS6q4qyuy.94p.FUPaVQivMv.nOG'}
      ]);
    });
};
