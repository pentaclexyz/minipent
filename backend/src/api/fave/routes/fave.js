"use strict";

/**
 * fave router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

const defaultRouter = createCoreRouter("api::fave.fave");
const { customRouter } = require("../../../util/custom-router");
const myExtraRoutes = [
  {
    method: "GET",
    path: "/fave/addFave",
    handler: "api::fave.fave.addFave",
  },
  {
    method: "GET",
    path: "/fave/removeFave",
    handler: "api::fave.fave.removeFave",
  },
  {
    method: "GET",
    path: "/fave/getByOwner",
    handler: "api::fave.fave.getByOwner",
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
