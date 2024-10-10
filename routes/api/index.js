const router = require('express').Router()
const userRoutes = require('./userRoutes')
const thoughtRoutes = require('./thoughtRoutes')

router.get('/users', userRoutes)
router.get('thoughts', thoughtRoutes)

module.exports = router