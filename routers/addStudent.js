const router = require('koa-router')();
const controller = require('../controller/c-student.js')

router.post('/api/addStudent',controller.addStudent);

module.exports = router;