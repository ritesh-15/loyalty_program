'use strict';

/**
 * seller service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::seller.seller');
