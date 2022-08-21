"use strict";

/**
 * fave service.
 */
const { ethers } = require("ethers");
const { createCoreService } = require("@strapi/strapi").factories;
module.exports = createCoreService("api::fave.fave", ({ strapi }) => ({
  async addFave({ owner, item_id, signature }) {
    const signatureOwner = ethers.utils.verifyMessage(item_id, signature);
    if (signatureOwner === owner) {
      const [previousFave] = await strapi.entityService.findMany(
        "api::fave.fave",
        { filters: { item_id, owner, signature } }
      );
      if (previousFave) {
        return { success: false };
      }
      const data = {
        owner,
        item_id,
        signature,
      };
      const db_entry = await strapi.service("api::fave.fave").create({
        data,
      });
      return { success: true, data, db_entry };
    }
    return { success: false };
  },
  async removeFave({ owner, item_id, signature }) {
    const signatureOwner = ethers.utils.verifyMessage(item_id, signature);
    if (signatureOwner === owner) {
      const [previousFave] = await strapi.entityService.findMany(
        "api::fave.fave",
        { filters: { item_id, owner, signature } }
      );
      if (previousFave) {
        const data = {
          owner,
          item_id,
          signature,
        };
        const uuid = +item_id.split(":")[1];
        await strapi.service("api::fave.fave").delete(uuid);
        return { success: true, data };
      }
      return { success: false };
    }
    return { success: false };
  },
  async getByOwner({ owner, signature }) {
    const msg = "Connect your wallet to save items to your favourites";
    const signatureOwner = ethers.utils.verifyMessage(msg, signature);
    if (signatureOwner === owner) {
      const previousFaves = await strapi.entityService.findMany(
        "api::fave.fave",
        { filters: { owner } }
      );
      return previousFaves;
    }
    return { success: false };
  },
}));
