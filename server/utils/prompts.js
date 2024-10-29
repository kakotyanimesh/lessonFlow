const overview = ({subject, topic, grade, duration }) => {
    return `Create a detailed overview and list learning objectives for a lesson plan on the topic ${topic}, for a ${grade} class, in the subject of ${subject}.

The overview should include:
    - A brief introduction to the topic.
    - Key concepts and skills that will be covered.
    - How the lesson aligns with the subject's broader goals with a word limit of 60.

The learning objectives should be clear, measurable, and focus on what students should be able to do by the end of the lesson. Do not use bullet points, asterisks, or special symbols. Format the learning objectives as simple sentences.

Provide at least 3-5 learning objectives formatted like this:

LO-1: [Learning objective]
LO-2: [Learning objective]
LO-3: [Learning objective], only 3 learning objective is needed. 
`
}

const curricularParagraph = ({subject, topic, grade}) => {
    return `
    Create a detailed list of curricular goals and curricular competencies for a lesson plan on the topic of "${topic}" for a grade ${grade} class in the subject of "${subject}". Do not use bullet points, asterisks, or special symbols. The goals and competencies should be formatted as simple sentences and word limit is 60.

For the curricular goals, focus on the broader understanding students should gain by the end of the lesson, and format them like this:

CG-1: [Curricular Goal]
CG-2: [Curricular Goal], only need two curricular Goals 

For the curricular competencies, focus on the specific skills and abilities students should develop during the lesson, and format them like this:

CC-1: [Curricular Competency]
CC-2: [Curricular Competency]
CC-3: [Curricular Competency], only need 3 curricular competency

Make sure the response is formatted no extra symbols or headings.
    `
}

const factualKnowledgepart = ({subject, topic, duration}) => {
    return `Write three factual knowledge points about topic ${topic} of subject ${subject}. Each point should focus on a key principle and have a word limit of 12 words. The points should cover the lesson plan of topic ${topic} which has duration of ${duration} minutes . Just write the points dont add here are the three points or something else `
}
const conceptualpart = ({subject, topic, duration}) => {
    return `Write three conceptual knowledge points about topic ${topic} of subject ${subject}. Each point should focus a key principle with a word limit of 12 words. The points should cover the lesson plan of topic ${topic} which has duration of ${duration} minutes . Just write the points dont add here are the three points or something else `
}
const proceduralpart = ({subject, topic, duration}) => {
    return `Write three procedural knowledge points focused on topic ${topic} of subject ${subject} Each point should describe a specific step or action, with a word limit of 12 words. The points should cover the lesson plan of topic ${topic} which has duration of ${duration} minutes . Just write the points dont add here are the three points or something else `
}



module.exports = {
    overview,
    curricularParagraph,
    conceptualpart,
    proceduralpart,
    factualKnowledgepart
}