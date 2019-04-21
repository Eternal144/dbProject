const router = require('koa-router')();
const controller = require('../controller/c-people');

router.get("/api/people",controller.getPeople)
module.exports = router