'use strict';

/**
 * reward service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::reward.reward');
