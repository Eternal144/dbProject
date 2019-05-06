const router = require('koa-router')();
const controller = require('../controller/c-record.js')

router.get('/api/info/allRecord',controller.getAllRecord)
router.get('/api/situation/record',controller.getRecord)

router.post('/api/insert/record',controller.insertRecord)
router.delete('/api/delete/record',controller.deleteRecord)
router.put('/api/update/record',controller.updateRecord)


module.exports = router;