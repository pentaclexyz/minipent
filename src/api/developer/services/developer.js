'use strict';

/**
 * developer service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::developer.developer');
