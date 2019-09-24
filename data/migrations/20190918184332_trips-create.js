
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users.string('name', 128).notNullable();
        users.string('username', 128).notNullable().unique();
        users.string('password', 128).notNullable();
    })
    .createTable('trips', trips => {
        trips.increments();
        trips.string('destination').notNullable();
        trips.boolean('complete').defaultTo(false);
        trips.date('start_date');
        trips.date('end_date');
    })
    .createTable('expenses', expenses => {
        expenses.increments();
        expenses.string('name').notNullable();
        expenses.decimal('price').notNullable();
        expenses.integer('trip_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('trips')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
    .createTable('user_trips', tbl => {
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.integer('trip_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('trips')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.primary(['user_id', 'trip_id'])
    })
    .createTable('user_expenses', tbl => {
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.integer('expense_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('expenses')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.decimal('amount')
        tbl.primary(['user_id', 'expense_id'])
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('trips')
        .dropTableIfExists('expenses')
        .dropTableIfExists('user_trips')
        .dropTableIfExists('user_expenses')
};
