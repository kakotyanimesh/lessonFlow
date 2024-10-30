const { Router } = require('express')
const { createPlan, viewAllPlans } = require('../controller/lesson.controller')
const { auth } = require('../middlewares/auth')


const lessonRouter = Router()


lessonRouter.post('/createPlan',auth, createPlan)
lessonRouter.get('/viewAllLessonPlans', viewAllPlans)



module.exports = {
    lessonRouter
}