module.exports = {
  async up(knex) {
    await knex.schema.alterTable('developers', function (table) {
      table.string('content');
    })
  },
};
