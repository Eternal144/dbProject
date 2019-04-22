const router = require('koa-router')()
const controller = require('../controller/c-grades')

//查询成绩
router.get('/api/info/grade',controller.getGrade)
module.exports = router;