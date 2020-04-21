'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/form', controller.form.post);
  router.get('/linknum', controller.linknum.get);
};
