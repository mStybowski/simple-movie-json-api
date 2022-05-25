import index from './index.routes.js';

export default (app) => {
  app.use('/', index);
};