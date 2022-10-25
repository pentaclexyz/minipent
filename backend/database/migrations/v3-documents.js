module.exports = {
  async up(knex) {
    await knex.schema.createTable('documents', function (table) {
      table.increments();
      table.string('name');
      table.string('content');
      table.string('description');
      table.uuid('slug');
      table.timestamps();
    })
  },
};
