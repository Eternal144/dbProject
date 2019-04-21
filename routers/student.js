const router = require('koa-router')();
const controller = require('../controller/c-student');

router.get('/api/student',controller.getJson);

module.exports = router