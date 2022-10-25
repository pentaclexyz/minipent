'use strict';

/**
 * calendar service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::calendar.calendar');
