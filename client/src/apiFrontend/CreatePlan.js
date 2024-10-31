import axios from "axios";

const axiosPlan = axios.create({
    baseURL:'https://lessonflow.onrender.com/api/v1/lesson'
})


const genereatePlan =async ({subject, topic, grade, duration}) => {
    try {
        const response = await axiosPlan.post('/createPlan', {
            subject,
            topic,
            grade,
            duration
        }, { responseType: 'blob' })

        return response
    } catch (error) {
        console.log(`error while creating the user : ${error}`);
    }
}

export{
    genereatePlan
}