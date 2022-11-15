module.exports = {
  async up(knex) {
    await knex.schema.alterTable('projects', function (table) {
      table.string('content');
    })
  },
};
