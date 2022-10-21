module.exports = {
  async up(knex) {
    await knex.schema.dropTableIfExists('calendar_items_events_links')
    await knex.schema.dropTableIfExists('calendar_items_people_links')
    await knex.schema.dropTableIfExists('calendar_items_plannings_links')
    await knex.schema.dropTableIfExists('calendar_items')
  },
};
