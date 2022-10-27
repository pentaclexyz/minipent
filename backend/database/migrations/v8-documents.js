module.exports = {
  async up(knex) {
    await knex.schema.hasTable('documents').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('documents', function(table) {
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
