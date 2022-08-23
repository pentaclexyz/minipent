'use strict';

/**
 * planning service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::planning.planning');
