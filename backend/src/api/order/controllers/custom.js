
const { createCoreController } = require('@strapi/strapi').factories;


// orders => collection name
module.exports = createCoreController('api::orders.orders', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },
}));