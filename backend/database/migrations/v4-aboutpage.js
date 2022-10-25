module.exports = {
  async up(knex) {
    await knex.schema.hasTable('abouts').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('abouts', function(table) {
            table.increments();
            table.timestamps();
        });
      }
    });
  },
};
