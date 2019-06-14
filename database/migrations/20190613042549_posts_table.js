exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', table => {
        table.increments();
        table.string('title').notNullable().unique();
        table.text('body').notNullable();
        table.text('summary')
        table.integer('reactions');
        table.integer('shares');
        table.timestamps(true, true);
    });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
