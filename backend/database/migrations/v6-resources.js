module.exports = {
  async up(knex) {
    await knex.schema.hasTable('resources').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('resources', function(table) {
          table.increments();
          table.string('name');
          table.string('content');
          table.string('description');
          table.uuid('slug');
          table.timestamps();
        });
      }
    });
  },
};
