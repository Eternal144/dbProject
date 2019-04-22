const router = require('koa-router')();
const controller = require('../controller/c-json');

router.get('/api/student',controller.getJson);

module.exports = router