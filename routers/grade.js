const router = require('koa-router')()
const controller = require('../controller/c-grades')

//根据学生信息和课程信息查询
router.get('/api/info/grade',controller.getScore)
//根据课程信息查询所有课程
router.get('/api/info/allStudentScores',controller.getAllStudentScores)
router.get('/api/info/allCourseScores',controller.getAllCourseScores)
//获取所有课程的平均成绩
router.get('/api/average/allCourse',controller.getAllCourseAverage)
//获取某个学生的平均成绩
router.get('/api/average/student',controller.getStudentAverage)

router.get('/api/average/course',controller.getCourseAverage)
//获取某个年纪的全部班级的平均成绩，按班级排名
router.get('/api/average/class',controller.getClassAverage)


module.exports = router;