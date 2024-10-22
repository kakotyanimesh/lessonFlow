const { Router } = require('express')
const { auth } =require('../middlewares/auth')
const { signUp, signIn, viewPlans} = require('../controller/user.controller')

const userRouter = Router()


userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)
userRouter.get('/viewPlan',auth, viewPlans)


module.exports = {
    userRouter
}