module.exports = {
  async up(knex) {
    await knex.schema.createTable('abouts_components', function (table) {
      table.increments();
      table.integer('entity_id');
      table.integer('component_id');
      table.string('component_type');
      table.string('field');
      table.integer('order');
    })
  },
};
