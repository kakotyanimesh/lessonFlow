const mongoose = require('mongoose')
const { string } = require('zod')

const { Schema,Types : { ObjectId } } = mongoose


const LessonSchema = new Schema({
    subject : {
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
    content : {
        type : String,
        required : true
    },
    creatorId : {
        type : ObjectId,
        ref : 'User',
        required : true
    }
}, { timestamps : true})


const LessonPlanModel = mongoose.model('LessonPlan', LessonSchema)

module.exports = {
    LessonPlanModel
}