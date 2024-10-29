const { lessonPlanObject } = require('../utils/zod')
const axios = require('axios')
const { OpenAI, Configuration } = require('openai')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { LessonPlanModel } = require('../model/lesson.model')
const { createDocument } = require('../utils/convert')
const { overview, curricularParagraph, conceptualpart, proceduralpart, factualKnowledgepart } = require('../utils/prompts')



const createPlan = async (req, res) => {
    const parsedObject = lessonPlanObject.safeParse(req.body)
    const userId = req.userId

    if(!parsedObject.success) return res.status(403).json({msg : `provide valid crediantials`, error : parsedObject.error.errors})
        
    const { subject, topic, grade, duration } = parsedObject.data
    // const combinedLessonPlanPrompt = `
    //                                 Please provide the response without using any headings or section titles, as the headings are already prewritten. Focus only on delivering the content requested.
                                
    //                                 Create a comprehensive lesson plan for the subject: ${subject}, targeting grade level: ${grade}. The plan should cover a ${duration}-minute class and include the following:
                                
    //                                 1. Provide an overview of the lesson, describing the main concepts and activities that will be covered, keeping the duration of the class in mind.
    //                                 2. List the key learning points, formatted as:
    //                                    - LP-1: [Brief description of the learning point]
    //                                    - LP-2: [Brief description of the learning point]
    //                                    - LP-3: [Brief description of the learning point]
    //                                 3. Define the broader curricular goals, formatted as:
    //                                    - CG-1: [Description of the first curricular goal]
    //                                    - CG-2: [Description of the second curricular goal]
    //                                 4. List specific curricular competencies, formatted as:
    //                                    - CC-1: [Description of the first competency]
    //                                    - CC-2: [Description of the second competency]
    //                                 5. Map the learning outcomes to curricular competencies in a table:
    //                                    | **Curricular Competency** | **Learning Outcome** | **Details** |
    //                                    |---------------------------|---------------------|-------------|
    //                                    | CC-1                      | LO-1: [Learning outcome description] | [Details of how it aligns with the competency] |
    //                                    | CC-2                      | LO-2: [Learning outcome description] | [Details of how it aligns with the competency] |
                                
    //                                 6. Describe the previous knowledge students should have before starting the lesson, relevant to understanding the new concepts.
    //                                 7. Describe the instructional strategies, including:
    //                                    - **Approach**: [Overall teaching approach, e.g., hands-on learning, inquiry-based learning].
    //                                    - **Method**: [Specific teaching methods like demonstrations, student experiments, or group activities].
    //                                 8. List all the teaching and learning resources required, including tools, diagrams, digital resources, and any other relevant aids.
    //                                 9. Create an introduction for the lesson, including questions or activities to engage students and connect to their prior knowledge.
    //                                 10. Outline the presentation for the lesson, including:
    //                                    - **Teaching Points**: [List key teaching points].
    //                                    - **Sequential Learning Activities**: Present in a table:
    //                                      | **Teaching Points**         | **Learning Outcomes**   | **Activities**          |
    //                                      |-----------------------------|-------------------------|-------------------------|
    //                                      | [What makes objects visible?]| LO-1                    | [Activity description]   |
    //                                      | [Laws of Reflection]         | LO-2, LO-3              | [Activity description]   |
    //                                    - **Formative Assessment**: [Methods to assess students' understanding during the lesson].
    //                                    - **Expected Queries**: [Common questions students may ask and answers].
    //                                 11. Outline key points, diagrams, and notes for the blackboard.
    //                                 12. Provide a summary of the key takeaways and main points covered in the lesson.
    //                                 13. List assessment questions to test students' understanding of key concepts covered in the lesson.
    //                                 14. Suggest home assignments or projects to reinforce the concepts covered in the lesson.
    //                                 15. Recommend additional reading materials or online resources to deepen understanding, including books, articles, and websites.
    //                                 16. Create a student-teacher reflection section, including suggestions for improving the lesson based on student feedback and observations of student engagement and understanding.`;
                                
        const overviewPrompt = overview({subject, topic, grade, duration})
        const curricularParaPrompt = curricularParagraph({subject, topic, grade})
        const factualKnowledgePrompt = factualKnowledgepart({subject, topic, grade})
        const conceptualPrompt = conceptualpart({subject, topic, grade})
        const proceduralPrompt = proceduralpart({subject, topic, grade})
    // const combinedLessonPlanPrompt = `create a lesson plan on the subbject ${subject} with ${topic} of grade ${grade} of duration ${duration}`
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const [overview, curricularPara, factualpart, conceptual, procedural ] = await Promise.all([
            model.generateContent(overviewPrompt),
            model.generateContent(curricularParaPrompt),
            model.generateContent(factualKnowledgePrompt),
            model.generateContent(conceptualPrompt),
            model.generateContent(proceduralPrompt)
        ])
        

        // console.log(result.response.candidates[0].content.parts[0].text);
        const overviewText = overview.response.candidates[0].content.parts[0].text
        const curricularText = curricularPara.response.candidates[0].content.parts[0].text
        const factualsText = factualpart.response.candidates[0].content.parts[0].text
        const conceptualText = conceptual.response.candidates[0].content.parts[0].text
        const proceduralText = procedural.response.candidates[0].content.parts[0].text
        
        createDocument({overviewText, curricularText, factualsText, conceptualText, proceduralText})

        res.status(200).json({
            generatedTextOne : overviewText,
            generatedTextTwo : curricularText
        })
            
    } catch (error) {
        console.log(`lesson plan ${error}`);
        res.json({
            msg : `error while creating the lesson Plan ${error.message}`
        })
        
    }
}



const viewAllPlans = async(req, res) => {
    try {
        const lessonPlans = await LessonPlanModel.find({})

        res.status(200).json({
            msg : 'all lesson plans fetched successfully',
            lessonPlans : lessonPlans
        })
    } catch (error) {
        console.log(`error while fetching all lessonPlans, ${error.message}`);
        res.status(500).json({
            msg : `error while fetching plans : ${error.message}`
        })
        
    }
}

module.exports = {
    createPlan,
    viewAllPlans
}



 /*const overview = await model.generateContent(overviewPrompt);
        const learningPoints = await model.generateContent(learningPointsPrompt);
        const curricularGoals = await model.generateContent(curricularGoalsPrompt);
        const curricularCompetencies = await model.generateContent(curricularCompetenciesPrompt);
        const mapping = await model.generateContent(mappingPrompt);
        const previousKnowledge = await model.generateContent(previousKnowledgePrompt);
        const instructionalStrategies = await model.generateContent(instructionalStrategiesPrompt);
        const resources = await model.generateContent(resourcesPrompt);
        const presentation = await model.generateContent(presentationPrompt);
        const blackboardWork = await model.generateContent(blackboardWorkPrompt);
        const summarisation = await model.generateContent(summarisationPrompt);
        const assessmentQuestions = await model.generateContent(assessmentQuestionsPrompt);
        const homeAssignment = await model.generateContent(homeAssignmentPrompt);
        const suggestedReadings = await model.generateContent(suggestedReadingsPrompt);
        const reflection = await model.generateContent(reflectionPrompt);
        */
        // sending one request one after another will takes too much time so send them at one time with promise.all 


// const createPlan = async (req, res) => {
//     const parsedObject = lessonPlanObject.safeParse(req.body)
//     const userId = req.userId

//     if(!parsedObject.success) return res.status(403).json({msg : `provide valid crediantials`, error : parsedObject.error.errors})
        
//     const { subject, grade, duration } = parsedObject.data

//     try {
//         const genAI = new GoogleGenerativeAI('');
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


//         const generalInstruction = `Please provide the response without using any headings or section titles, as the headings are already prewritten. Focus only on delivering the content requested.`;
        
//         const overviewPrompt = `${generalInstruction} Create an overview for a lesson plan on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Provide a brief description of the lesson, including the main concepts and activities that will be covered. 
//                                 Make sure the overview is suitable for a ${duration}-minute class. Avoid using any headings in the response.`;


//         const learningPointsPrompt = `${generalInstruction} List key learning points for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Format the points as follows:
//                                 - LP-1: [Brief description of the learning point]
//                                 - LP-2: [Brief description of the learning point]
//                                 - LP-3: [Brief description of the learning point]`;
//         const curricularGoalsPrompt = `${generalInstruction} Define the broader curricular goals for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                    Format the goals as follows:
//                                    - CG-1: [Description of the first curricular goal]
//                                    - CG-2: [Description of the second curricular goal]`;

//         const curricularCompetenciesPrompt = `${generalInstruction} List specific curricular competencies for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                       Format the competencies as follows:
//                                       - CC-1: [Description of the first competency]
//                                       - CC-2: [Description of the second competency]`;

//         const mappingPrompt = `${generalInstruction} Map the learning outcomes with curricular competencies for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Provide the mapping in a table with three columns:
//                                 | **Curricular Competency** | **Learning Outcome** | **Details** |
//                                 |---------------------------|---------------------|-------------|
//                                 | CC-1                      | LO-1: [Learning outcome description] | [Details of how it aligns with the competency] |
//                                 | CC-2                      | LO-2: [Learning outcome description] | [Details of how it aligns with the competency] |`;


//         const previousKnowledgePrompt = `${generalInstruction}  Describe the previous knowledge students should have before starting a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 This knowledge should be relevant to understanding the new concepts presented in the lesson.`;

//         const instructionalStrategiesPrompt = `${generalInstruction} Describe the instructional strategies for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Include the following:
//                                 - **Approach**: Describe the overall teaching approach (e.g., hands-on learning, inquiry-based learning).
//                                 - **Method**: Describe specific teaching methods like demonstrations, student experiments, or group activities.`;
//         const resourcesPrompt = `${generalInstruction} List all the teaching and learning resources required for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Include materials like tools, diagrams, digital resources, and any other relevant aids.`;

//         const introductionPrompt = `${generalInstruction} Create an introduction for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Include questions or activities to engage students and connect to their prior knowledge. Make sure the introduction is suitable for a ${duration}-minute class.`;

//         const presentationPrompt = `${generalInstruction} Outline the presentation for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Include the following:
//                                 - **Teaching Points**: List key teaching points.
//                                 - **Sequential Learning Activities**: Present this in a table with three columns:
//                                       | **Teaching Points**       | **Learning Outcomes** | **Activities** |
//                                       |---------------------------|----------------------|----------------|
//                                       | What makes objects visible? | LO-1                | [Activity description] |
//                                       | Laws of Reflection        | LO-2, LO-3           | [Activity description] |
//                                 - **Formative Assessment**: Include methods to assess students' understanding during the lesson.
//                                 - **Expected Queries**: Include common questions students may ask and provide answers.`;

//         const blackboardWorkPrompt = `${generalInstruction} Outline the key points, diagrams, and notes that should be illustrated on the board for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Include any important concepts that should be visually represented.`;

//         const summarisationPrompt = `${generalInstruction} Provide a summary for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Include the key takeaways and main points covered in the lesson.`;

//         const assessmentQuestionsPrompt = `${generalInstruction} List assessment questions for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Include questions that test students' understanding of key concepts covered in the lesson.`;

//         const homeAssignmentPrompt = `${generalInstruction} Suggest home assignments or projects for students to complete after a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 These assignments should reinforce the concepts covered in the lesson.`;

//         const suggestedReadingsPrompt = `${generalInstruction} Recommend additional reading materials or online resources for students to deepen their understanding of the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Include books, articles, and websites.`;

//         const reflectionPrompt = `${generalInstruction}Create a student-teacher reflection section for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
//                                 Include suggestions for improving the lesson based on student feedback, as well as observations of student engagement and understanding.`;


//         const [
//             overview,
//             learningPoints,
//             curricularGoals,
//             curricularCompetencies,
//             mapping,
//             previousKnowledge,
//             instructionalStrategies,
//             resources,
//             introduction,
//             presentation,
//             blackboardWork,
//             summarisation,
//             assessmentQuestions,
//             homeAssignment,
//             suggestedReadings,
//             reflection
//         ] = await Promise.all([
//             model.generateContent(overviewPrompt),
//             model.generateContent(learningPointsPrompt),
//             model.generateContent(curricularGoalsPrompt),
//             model.generateContent(curricularCompetenciesPrompt),
//             model.generateContent(mappingPrompt),
//             model.generateContent(previousKnowledgePrompt),
//             model.generateContent(instructionalStrategiesPrompt),
//             model.generateContent(resourcesPrompt),
//             model.generateContent(introductionPrompt),
//             model.generateContent(presentationPrompt),
//             model.generateContent(blackboardWorkPrompt),
//             model.generateContent(summarisationPrompt),
//             model.generateContent(assessmentQuestionsPrompt),
//             model.generateContent(homeAssignmentPrompt),
//             model.generateContent(suggestedReadingsPrompt),
//             model.generateContent(reflectionPrompt)
//         ]);
        
          
//         const content = `## Lesson Plan: ${subject} - Grade ${grade}
    
//                     **Duration:** ${duration} minutes
    
//                     ### 1. Overview of the Lesson:
//                     ${overview.response.text()}
    
//                     ### 2. Learning Points:
//                     ${learningPoints.response.text()}

//                     ### 3. Curricular Goals:
//                     ${curricularGoals.response.text()}

//                     ### 4. Curricular Competencies:
//                     ${curricularCompetencies.response.text()}

//                     ### 5. Mapping of Learning Outcomes with Curricular Competencies:
//                     ${mapping.response.text()}

//                     ### 6. Previous Knowledge:
//                     ${previousKnowledge.response.text()}

//                     ### 7. Instructional Strategies:
//                     ${instructionalStrategies.response.text()}

//                     ### 8. Teaching-Learning Resources:
//                     ${resources.response.text()}

//                     ### 9.Introduction: 
//                     ${introduction.response.text()}

//                     ### 10. Presentation:
//                     ${presentation.response.text()}

//                     ### 11. Blackboard Work:
//                     ${blackboardWork.response.text()}

//                     ### 12. Summarisation of the Lesson:
//                     ${summarisation.response.text()}

//                     ### 13. Assessment Questions:
//                     ${assessmentQuestions.response.text()}

//                     ### 14. Home Assignment:
//                     ${homeAssignment.response.text()}

//                     ### 15. Suggested Readings:
//                     ${suggestedReadings.response.text()}

//                     ### 1. Student-Teacher Reflection:
//                     ${reflection.response.text()}
//         `;

//         // the upper thing is for mongodb server => 

//         const lessonFile = createDocx({
//             overview: overview.response.text(),
//             learningPoints: learningPoints.response.text(),
//             curricularGoals: curricularGoals.response.text(),
//             curricularCompetencies: curricularCompetencies.response.text(),
//             mapping: mapping.response.text(),
//             previousKnowledge: previousKnowledge.response.text(),
//             instructionalStrategies: instructionalStrategies.response.text(),
//             resources: resources.response.text(),
//             introduction: introduction.response.text(),
//             presentation: presentation.response.text(),
//             blackboardWork: blackboardWork.response.text(),
//             summarisation: summarisation.response.text(),
//             assessmentQuestions: assessmentQuestions.response.text(),
//             homeAssignment: homeAssignment.response.text(),
//             suggestedReadings: suggestedReadings.response.text(),
//             reflection: reflection.response.text(),}, `lessonPlan`)

//             console.log('Lesson file path:', lessonFile);


//         await LessonPlanModel.create({
//             subject,
//             grade,
//             duration,
//             content : content,
//             creatorId : userId

//         })

//         res.download(lessonFile, (err) => {
//             if(err) {
//                 console.log(`error while creating the file : ${err}`);
//                 res.status(500).send('unable to create file')
//             } else {
//                 fs.unlinkSync(lessonFile)
//             }
//         })
          
//     } catch (error) {
//         console.error('Error during api request:', error.content?.data || error.message);
//         res.status(500).json({
//             msg : `something went wrong error : ${error}`

//         })
        
//     }
// }

// CODE FOR OPENAI API
/*const response = await axios.post('https://api.openai.com/v1/completions', {
            prompt: `Create a detailed lesson plan for the subject: ${subject}, targeting grade level: ${grade}. 
            The lesson plan should be structured as follows:
          
            1. **General Objectives**: Outline what students should be able to recall, understand, apply, and analyze after completing this lesson.
            2. **Specific Objectives**: Provide measurable learning outcomes, such as defining terms, identifying concepts, and solving related problems.
            3. **Teaching Aids**: List any teaching aids, such as diagrams, charts, or tools, that will help illustrate key concepts.
            4. **Presentation**:
               - **Specifications**: List the key topics or concepts to be covered.
               - **Teaching Method**: Mention methods like deductive, inductive, demonstration, or practice.
               - **Lesson Content**: Describe the key points or concepts, such as definitions or properties, with examples.
               - **Learning Experience**: Explain how students will engage with the content.
               - **Evaluation**: Include sample questions or activities to assess students' understanding, such as defining terms or solving problems.
            5. **Assignment**: Suggest activities or problems for students to complete as homework.
          
            Make the plan suitable for a ${duration}-minute class.`,
            model: 'gpt-3.5-turbo-0125',
            max_tokens: 1500,
          }, {
            headers: {
              'Authorization': `Bearer ${process.env.OPEN_API_KEY}`,
            },
          });

        const content = response.data.choices[0].text;
        */


    
        // const openai = new OpenAI({
            //     apiKey: process.env.OPNEAI_API,
            //   });
            // const createPlan = async (req, res) => {
            //     const parsedObject = lessonPlanObject.safeParse(req.body)
                
            //     const userId = req.userId
                
            //     if(!parsedObject.success) return res.status(403).json({msg : `provide valid crediantials`, error : parsedObject.error.errors})
                        
            //     const { subject, grade, duration } = parsedObject.data
            
            //     const prompts = [
            //         {
            //             id: 'overview',
            //             prompt: `Create an overview for a lesson plan on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Provide a brief description of the lesson, including the main concepts and activities that will be covered. 
            //             Make sure the overview is suitable for a ${duration}-minute class.`
            //         },
            //         {
            //             id: 'learningPoints',
            //             prompt: `List key learning points for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Format the points as follows:
            //             - LP-1: [Brief description of the learning point]
            //             - LP-2: [Brief description of the learning point]
            //             - LP-3: [Brief description of the learning point]`
            //         },
            //         {
            //             id: 'curricularGoals',
            //             prompt: `Define the broader curricular goals for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Format the goals as follows:
            //             - CG-1: [Description of the first curricular goal]
            //             - CG-2: [Description of the second curricular goal]`
            //         },
            //         {
            //             id: 'curricularCompetencies',
            //             prompt: `List specific curricular competencies for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Format the competencies as follows:
            //             - CC-1: [Description of the first competency]
            //             - CC-2: [Description of the second competency]`
            //         },
            //         {
            //             id: 'mapping',
            //             prompt: `Map the learning outcomes with curricular competencies for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Provide the mapping in a table with three columns:
            //             | **Curricular Competency** | **Learning Outcome** | **Details** |
            //             |---------------------------|---------------------|-------------|
            //             | CC-1                      | LO-1: [Learning outcome description] | [Details of how it aligns with the competency] |
            //             | CC-2                      | LO-2: [Learning outcome description] | [Details of how it aligns with the competency] |`
            //         },
            //         {
            //             id: 'previousKnowledge',
            //             prompt: `Describe the previous knowledge students should have before starting a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             This knowledge should be relevant to understanding the new concepts presented in the lesson.`
            //         },
            //         {
            //             id: 'instructionalStrategies',
            //             prompt: `Describe the instructional strategies for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Include the following:
            //             - **Approach**: Describe the overall teaching approach (e.g., hands-on learning, inquiry-based learning).
            //             - **Method**: Describe specific teaching methods like demonstrations, student experiments, or group activities.`
            //         },
            //         {
            //             id: 'resources',
            //             prompt: `List all the teaching and learning resources required for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Include materials like tools, diagrams, digital resources, and any other relevant aids.`
            //         },
            //         {
            //             id: 'introduction',
            //             prompt: `Create an introduction for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Include questions or activities to engage students and connect to their prior knowledge. Make sure the introduction is suitable for a ${duration}-minute class.`
            //         },
            //         {
            //             id: 'presentation',
            //             prompt: `Outline the presentation for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Include the following:
            //             - **Teaching Points**: List key teaching points.
            //             - **Sequential Learning Activities**: Present this in a table with three columns:
            //                   | **Teaching Points**       | **Learning Outcomes** | **Activities** |
            //                   |---------------------------|----------------------|----------------|
            //                   | What makes objects visible? | LO-1                | [Activity description] |
            //                   | Laws of Reflection        | LO-2, LO-3           | [Activity description] |
            //             - **Formative Assessment**: Include methods to assess students' understanding during the lesson.
            //             - **Expected Queries**: Include common questions students may ask and provide answers.`
            //         },
            //         {
            //             id: 'blackboardWork',
            //             prompt: `Outline the key points, diagrams, and notes that should be illustrated on the board for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Include any important concepts that should be visually represented.`
            //         },
            //         {
            //             id: 'summarisation',
            //             prompt: `Provide a summary for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Include the key takeaways and main points covered in the lesson.`
            //         },
            //         {
            //             id: 'assessmentQuestions',
            //             prompt: `List assessment questions for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Include questions that test students' understanding of key concepts covered in the lesson.`
            //         },
            //         {
            //             id: 'homeAssignment',
            //             prompt: `Suggest home assignments or projects for students to complete after a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             These assignments should reinforce the concepts covered in the lesson.`
            //         },
            //         {
            //             id: 'suggestedReadings',
            //             prompt: `Recommend additional reading materials or online resources for students to deepen their understanding of the subject: ${subject}, targeting grade level: ${grade}. 
            //             Include books, articles, and websites.`
            //         },
            //         {
            //             id: 'reflection',
            //             prompt: `Create a student-teacher reflection section for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
            //             Include suggestions for improving the lesson based on student feedback, as well as observations of student engagement and understanding.`
            //         }
            //     ];
                
            
            //     try {
            //         const responses = {}
            
            //         for (const {id, prompt} of prompts) {
            //             const response = await openai.completions.create({
            //                 model : 'gpt-4o-mini',
            //                 message : [
            //                     {
            //                         role : "user",
            //                         content : prompt
            //                     }
            //                 ]
            //             })
            //             console.log(response);
                        
            //         }
            
            //         res.status(200)
            
            //     } catch (error) {
            //         res.status(500).json({msg : `Error while creating lesson Plan ${error.message}`})
            //         console.log(error.message);
                    
            //     }
            // }