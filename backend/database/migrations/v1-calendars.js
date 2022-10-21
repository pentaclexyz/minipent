module.exports = {
  async up(knex) {
    await knex.schema.createTable('pentacleTest', function (table) {
      table.increments();
      table.string('name');
      table.timestamps();
    })
  },
};
