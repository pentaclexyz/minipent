module.exports = {
  async up(knex) {
    await knex.schema.createTable('abouts', function (table) {
      table.increments();
      table.timestamps();
    })
  },
};
