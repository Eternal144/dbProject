const router = require('koa-router')();
const controller = require('../controller/c-student.js');

router.get("/api/info/allStudent",controller.getAllStudent)
router.get("/api/info/student",controller.getStudent)
router.post('/api/insert/student',controller.insertStudent)
router.delete('/api/delete/student',controller.deleteStudent)
router.put('/api/update/student',controller.updateStudent)
module.exports = router