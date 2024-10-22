const { signUpObject, signInObject} = require('../utils/zod')
const bcrypt = require('bcrypt')
const { UserModel } = require('../model/user.model')
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt')
const { default: axios } = require('axios')


const signUp = async (req, res ) => {
    const parsedObject = signUpObject.safeParse(req.body)

    if(!parsedObject.success) return res.status(403).json({msg : 'invalid credentials ', error : parsedObject.error.errors})

    const {email, username, password, fullName } = parsedObject.data

    const hasedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await UserModel.create({
            email,
            username,
            password : hasedPassword,
            fullName
        })

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure : true
        }

        res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({
            msg : 'user created successfully',
            user : user
        })

    } catch (error) {
        console.log(`error while creating user error : ${error.message}`);
        res.status(500).json({
            msg : `something went wrong while creating user error : ${error}`
        })
    }
}


const signIn = async (req, res) => {
    const parsedObject = signInObject.safeParse(req.body)

    if(!parsedObject.success) return res.status(403).json({msg: 'invalid credentials ', error : parsedObject.error.errors})

    const { email, password } = parsedObject.data

    try {
        const user = await UserModel.findOne({email})
        if(!user) return res.status(400).json({msg: 'incorrect password or email'})

        const comparedPassword = await bcrypt.compare(password, user.password)

        if(!comparedPassword) return res.status(400).json({msg : 'incorrect password or email'})

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        const options = {
            httpOnly : true,
            secure : true
        }

        res.status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json({
                msg : 'user logged in Successfully'
            })
    } catch (error) {
        console.log(`error while login : ${error.message}`);
        
        res.status(500).json({
            msg : `something went wrong while signin ; error : ${error.message}`
        })
    }
}


const viewPlans = async (req, res) => {
    const userId = req.userId

    try {
        const response = await LessonPlanModel.find({creatorId : userId})

        res.status(200).json({
            msg : 'lesson plan fetched successfully',
            lessonPlans : response.content
        })
    } catch (error) {
        console.log(`error while fetching lessonPlan, error : ${error.message}`);
        res.status(500).json({
            msg : `error while fetching the data, ${error.message}`
        })
        
    }
}

module.exports = {
    signUp,
    signIn,
    viewPlans
}