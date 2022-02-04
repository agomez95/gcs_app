const express = require('express')
const router = express.Router()

const DeliverableController = require('../controllers/deliverable')

router.post('/', DeliverableController.deliverables_create_deliverable)
router.get('/findbyphase/:id', DeliverableController.deliverables_findDeliverablesByPhases_deliverable)

module.exports = router
