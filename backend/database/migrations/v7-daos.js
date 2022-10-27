module.exports = {
  async up(knex) {
    await knex.schema.hasTable('daos').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('daos', function(table) {
          table.increments();
          table.string('name');
          table.string('description');
          table.string('content');
          table.uuid('slug');
          table.timestamps();
        });
      }
    });
  },
};
