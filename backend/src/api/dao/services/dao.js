'use strict';

/**
 * dao service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dao.dao');
