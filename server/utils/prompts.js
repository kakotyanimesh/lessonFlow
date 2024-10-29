const overview = ({subject, topic, grade, duration }) => {
    return `Create a detailed overview and list learning objectives for a lesson plan on the topic ${topic}, for a ${grade} class, in the subject of ${subject}.Do not use bullet points, asterisks, or special symbols. Theoverview and list learning objectives should be formatted as simple sentences.

The overview should include:
    - A brief introduction to the topic and word limit for overview is only 30

The learning objectives should be clear, measurable, and focus on what students should be able to do by the end of the lesson. Do not use bullet points, asterisks, or special symbols. Format the learning objectives as simple sentences.

Provide at least 3 learning objectives formatted like this:

LO-1: [Learning objective]
LO-2: [Learning objective]
LO-3: [Learning objective]
Make sure the response is formatted no extra symbols or headings.
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
    return `Write three factual knowledge points about topic ${topic} of subject ${subject}. Each point should focus on a key principle and have a word limit of 10 words for each points . The points should cover the lesson plan of topic ${topic} which has duration of ${duration} minutes . Just write the points dont add here are the three points or something else and Do not use bullet points, asterisks, or special symbols also Make sure the response is formatted no extra symbols or headings. `
}
const conceptualpart = ({subject, topic, duration}) => {
    return `Write three conceptual knowledge points about topic ${topic} of subject ${subject}. Each point should focus a key principle with a word limit of 10 words. The points should cover the lesson plan of topic ${topic} which has duration of ${duration} minutes . Just write the points dont add here are the three points or something else  and Do not use bullet points, asterisks, or special symbols also Make sure the response is formatted no extra symbols or headings. `
}
const proceduralpart = ({subject, topic, duration}) => {
    return `Write three procedural knowledge points focused on topic ${topic} of subject ${subject} Each point should describe a specific step or action, with a word limit of 10 words. The points should cover the lesson plan of topic ${topic} which has duration of ${duration} minutes . Just write the points dont add here are the three points or something else  and Do not use bullet points, asterisks, or special symbols also Make sure the response is formatted no extra symbols or headings. `
}

const essentialQuestionPart = ({subject, topic, duration}) => {
    return `write max 3 essential question for teaching of topic ${topic} of subject ${subject} , the class duration is ${duration} minutes. Just write the points dont add here are the three points or something else and Do not use bullet points, asterisks, or special symbols also Make sure the response is formatted no extra symbols or headings.
    Provide at least 3 learning objectives formatted like this:

Q-1: [question no 1]
Q-2: [question no 2]
Q-3: [question no 3] `
}
const teachingPointPart = ({subject, topic, duration}) => {
    return `write max 3 teaching point on the topic ${topic} of subject ${subject} for a class of duration of ${duration} min, word limit of each teaching point is 10 Just write the points dont add here are the three points or something else and Do not use bullet points, asterisks, or special symbols also Make sure the response is formatted no extra symbols or headings
    
    Provide at least 3 teaching points  formatted like this:

TP-1: [teaching points no 1]
TP-2: [teaching points no 2]
TP-3: [teaching points no 3]

example of teaching point for topic light subtopic : laws of reflection : Laws of reflection or What makes object visible ? 
    `
}

const sequentialActivityPart = ({subject, topic, duration}) => {
    return `write max 3 sequential learning activity that can be done in a class of duration ${duration} min the topic of class is ${topic} and subject is ${subject} and word limit for each activity is 20 just write the points dont add here are the three points or something else in the first line and Do not use bullet points, asterisks, or special symbols also Make sure the response is formatted no extra symbols or headings
    
    Provide at least 3 sequential activity formatted like this:

Activity-1: [Activity no 1]
Activity-2: [Activity no 2]
Activity-3: [Activity no 3]

example of sequential activity for topic light subtopic : laws of reflection : Explain the need for light to make objects visible and introduce reflection  `
}

const formativeAssesmentPart = ({subject, topic , duration}) =>{
    return ` write max 3 formative assesment Activity for topic of ${topic} of subject ${subject} , the class duration is ${duration},just the question dont add any introduction and Do not use bullet points, asterisks, or special symbols also Make sure the response is formatted no extra symbols or headings
    
    Provide at least 3 formative assessment formatted like this:

 [formative assessment no 1]
 [formative assessment no 2]
 [formative assessment no 3]

example of formative assessment for topic light subtopic : laws of reflection : What happens if the surface is rough? `
}

const gptQuestionPart = ({subject, topic, duration}) => {
    return `Generate 3 question that can be asked in a class of duration of ${duration} minutes of subject ${subject} of topic ${topic} and dont add here are your three question in the first just write the 3 simple question , word limit of each question is 10 and Do not use bullet points, asterisks, or special symbols also Make sure the response is formatted no extra symbols or headings
    
    Provide at least 3 formative assessment formatted like this:

 Q-1:[question]
 Q-2:[question ]
 Q-3:[question ]

example of question during class  for topic light subtopic : 1.What are the two laws of reflection? and
How do you see objects in a mirror?
    `
}

const summarisationPart = ({subject, topic, duration}) => {
    return `write a short summarization of the topic ${topic} of subject ${subject} , the class duration is ${duration} minutes and write atleast three home work question or activity to learn that topic in a better way. dont add here are your three question in the first just write the summarization and home work question and  word limit of summary is 20 and word limit for each question is 12 and Do not use bullet points, asterisks, or special symbols also Make sure the response is formatted no extra symbols or headings
    Provide at least 3 Home work question  formatted like this:

 Q-1:[question  no 1]
 Q-2:[question  no 2]
 Q-3:[question  no 3]

example of home work question   for topic light subtopic : 1.What are the two laws of reflection?
2.How do you see objects in a mirror?
    
    `
}

module.exports = {
    overview,
    curricularParagraph,
    conceptualpart,
    proceduralpart,
    factualKnowledgepart,
    essentialQuestionPart,
    teachingPointPart,
    sequentialActivityPart,
    formativeAssesmentPart,
    gptQuestionPart,
    summarisationPart
}