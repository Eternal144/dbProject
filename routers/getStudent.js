const router = require('koa-router')();
const controller = require('../controller/c-student.js');

router.get("/api/info/getAllStudent",controller.getAllStudent)
router.get("/api/info/getStudent",controller.getStudent)
// router.get("/api/info/getStudent",controller.getStudent)
module.exports = router