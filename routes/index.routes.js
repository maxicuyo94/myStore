const { Router } = require('express');

const productsRouter = require('./products.routes');
const usersRouter = require('./users.routes');
const categoriesRouter = require('./categories.routes');

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);//base url

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
