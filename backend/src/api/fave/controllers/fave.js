"use strict";

/**
 * A addFave of functions called "actions" for `fave`
 */

/**
 *  tweet controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::fave.fave", ({ strapi }) => ({
  async addFave({ query }) {
    const { owner, item_id, signature } = query;
    return await strapi
      .service("api::fave.fave")
      .addFave({ owner, item_id, signature });
  },
  async removeFave({ query }) {
    const { owner, signature, item_id } = query;
    return await strapi
      .service("api::fave.fave")
      .removeFave({ owner, signature, item_id });
  },
  async getByOwner({ query }) {
    const { owner, signature } = query;
    return await strapi
      .service("api::fave.fave")
      .getByOwner({ owner, signature });
  },
}));
