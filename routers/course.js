const router = require('koa-router')()
const controller = require('../controller/c-course.js')

//查询课程相关
router.get('/api/info/course',controller.getCourse)
router.get('/api/situation/course',controller.getCourseSat)
router.post('/api/insert/course',controller.insertCourse)
router.delete('/api/delete/course',controller.deleteCourse)
router.put('/api/updata/course',controller.updateCourse)

module.exports = router;