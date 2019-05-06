const router = require('koa-router')()
const controller = require('../controller/c-course.js')

//查询课程相关
router.get('/api/info/course',controller.getCourse)
//查询该学生已选择的。
router.get('/api/situation/course',controller.getCourseSat)
//符合学生选的课但是学生没选的。
router.get('/api/fit/course',controller.getFitCourse)

router.post('/api/insert/course',controller.insertCourse)
router.delete('/api/delete/course',controller.deleteCourse)
router.put('/api/update/course',controller.updateCourse)

module.exports = router;