'use strict';

/**
 *  developer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::developer.developer');
