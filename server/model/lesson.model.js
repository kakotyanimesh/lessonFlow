const mongoose = require('mongoose')
const { string } = require('zod')

const { Schema,Types : { ObjectId } } = mongoose


const LessonSchema = new Schema({
    subject : {
        type : String,
        required : true
    },
    topic: {
        type : String,
        required : true
    },
    grade : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    // content : {
    //     type : String,
    //     required : true
    // },
    // creatorId : {
    //     type : ObjectId,
    //     ref : 'User',
    //     required : true
    // },
    creatorId: {
        type: String,  // Changed from ObjectId to String since we're using username and i can't able to figure out how to sent accesstoken from frontend
        required: true
    }
}, { timestamps : true})


const LessonPlanModel = mongoose.model('LessonPlan', LessonSchema)

module.exports = {
    LessonPlanModel
}