const { lessonPlanObject } = require('../utils/zod')
const axios = require('axios')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { LessonPlanModel } = require('../model/lesson.model')
const { createDocx } = require('../utils/convert')

const createPlan = async (req, res) => {
    const parsedObject = lessonPlanObject.safeParse(req.body)
    const userId = req.userId

    if(!parsedObject.success) return res.status(403).json({msg : `provide valid crediantials`, error : parsedObject.error.errors})
        
    const { subject, grade, duration } = parsedObject.data

    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const overviewPrompt = `Create an overview for a lesson plan on the subject: ${subject}, targeting grade level: ${grade}. 
                                Provide a brief description of the lesson, including the main concepts and activities that will be covered. 
                                Make sure the overview is suitable for a ${duration}-minute class.`;

        const learningPointsPrompt = `List key learning points for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                Format the points as follows:
                                - LP-1: [Brief description of the learning point]
                                - LP-2: [Brief description of the learning point]
                                - LP-3: [Brief description of the learning point]`;
        const curricularGoalsPrompt = `Define the broader curricular goals for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                   Format the goals as follows:
                                   - CG-1: [Description of the first curricular goal]
                                   - CG-2: [Description of the second curricular goal]`;

        const curricularCompetenciesPrompt = `List specific curricular competencies for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                      Format the competencies as follows:
                                      - CC-1: [Description of the first competency]
                                      - CC-2: [Description of the second competency]`;

        const mappingPrompt = `Map the learning outcomes with curricular competencies for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                Provide the mapping in a table with three columns:
                                | **Curricular Competency** | **Learning Outcome** | **Details** |
                                |---------------------------|---------------------|-------------|
                                | CC-1                      | LO-1: [Learning outcome description] | [Details of how it aligns with the competency] |
                                | CC-2                      | LO-2: [Learning outcome description] | [Details of how it aligns with the competency] |`;


        const previousKnowledgePrompt = `Describe the previous knowledge students should have before starting a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                This knowledge should be relevant to understanding the new concepts presented in the lesson.`;

        const instructionalStrategiesPrompt = `Describe the instructional strategies for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                Include the following:
                                - **Approach**: Describe the overall teaching approach (e.g., hands-on learning, inquiry-based learning).
                                - **Method**: Describe specific teaching methods like demonstrations, student experiments, or group activities.`;
        const resourcesPrompt = `List all the teaching and learning resources required for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                Include materials like tools, diagrams, digital resources, and any other relevant aids.`;

        const introductionPrompt = `Create an introduction for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                Include questions or activities to engage students and connect to their prior knowledge. Make sure the introduction is suitable for a ${duration}-minute class.`;

        const presentationPrompt = `Outline the presentation for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                Include the following:
                                - **Teaching Points**: List key teaching points.
                                - **Sequential Learning Activities**: Present this in a table with three columns:
                                      | **Teaching Points**       | **Learning Outcomes** | **Activities** |
                                      |---------------------------|----------------------|----------------|
                                      | What makes objects visible? | LO-1                | [Activity description] |
                                      | Laws of Reflection        | LO-2, LO-3           | [Activity description] |
                                - **Formative Assessment**: Include methods to assess students' understanding during the lesson.
                                - **Expected Queries**: Include common questions students may ask and provide answers.`;

        const blackboardWorkPrompt = `Outline the key points, diagrams, and notes that should be illustrated on the board for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                Include any important concepts that should be visually represented.`;

        const summarisationPrompt = `Provide a summary for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                Include the key takeaways and main points covered in the lesson.`;

        const assessmentQuestionsPrompt = `List assessment questions for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                Include questions that test students' understanding of key concepts covered in the lesson.`;

        const homeAssignmentPrompt = `Suggest home assignments or projects for students to complete after a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                These assignments should reinforce the concepts covered in the lesson.`;

        const suggestedReadingsPrompt = `Recommend additional reading materials or online resources for students to deepen their understanding of the subject: ${subject}, targeting grade level: ${grade}. 
                                Include books, articles, and websites.`;

        const reflectionPrompt = `Create a student-teacher reflection section for a lesson on the subject: ${subject}, targeting grade level: ${grade}. 
                                Include suggestions for improving the lesson based on student feedback, as well as observations of student engagement and understanding.`;


        const [
            overview,
            learningPoints,
            curricularGoals,
            curricularCompetencies,
            mapping,
            previousKnowledge,
            instructionalStrategies,
            resources,
            introduction,
            presentation,
            blackboardWork,
            summarisation,
            assessmentQuestions,
            homeAssignment,
            suggestedReadings,
            reflection
        ] = await Promise.all([
            model.generateContent(overviewPrompt),
            model.generateContent(learningPointsPrompt),
            model.generateContent(curricularGoalsPrompt),
            model.generateContent(curricularCompetenciesPrompt),
            model.generateContent(mappingPrompt),
            model.generateContent(previousKnowledgePrompt),
            model.generateContent(instructionalStrategiesPrompt),
            model.generateContent(resourcesPrompt),
            model.generateContent(introductionPrompt),
            model.generateContent(presentationPrompt),
            model.generateContent(blackboardWorkPrompt),
            model.generateContent(summarisationPrompt),
            model.generateContent(assessmentQuestionsPrompt),
            model.generateContent(homeAssignmentPrompt),
            model.generateContent(suggestedReadingsPrompt),
            model.generateContent(reflectionPrompt)
        ]);
        
          
        const content = `## Lesson Plan: ${subject} - Grade ${grade}
    
                    **Duration:** ${duration} minutes
    
                    ### 1. Overview of the Lesson:
                    ${overview.response.text()}
    
                    ### 2. Learning Points:
                    ${learningPoints.response.text()}

                    ### 3. Curricular Goals:
                    ${curricularGoals.response.text()}

                    ### 4. Curricular Competencies:
                    ${curricularCompetencies.response.text()}

                    ### 5. Mapping of Learning Outcomes with Curricular Competencies:
                    ${mapping.response.text()}

                    ### 6. Previous Knowledge:
                    ${previousKnowledge.response.text()}

                    ### 7. Instructional Strategies:
                    ${instructionalStrategies.response.text()}

                    ### 8. Teaching-Learning Resources:
                    ${resources.response.text()}

                    ### 9.Introduction: 
                    ${introduction.response.text()}

                    ### 10. Presentation:
                    ${presentation.response.text()}

                    ### 11. Blackboard Work:
                    ${blackboardWork.response.text()}

                    ### 12. Summarisation of the Lesson:
                    ${summarisation.response.text()}

                    ### 13. Assessment Questions:
                    ${assessmentQuestions.response.text()}

                    ### 14. Home Assignment:
                    ${homeAssignment.response.text()}

                    ### 15. Suggested Readings:
                    ${suggestedReadings.response.text()}

                    ### 1. Student-Teacher Reflection:
                    ${reflection.response.text()}
        `;

        const lessonFile = createDocx({
            overview: overview.response.text(),
            learningPoints: learningPoints.response.text(),
            curricularGoals: curricularGoals.response.text(),
            curricularCompetencies: curricularCompetencies.response.text(),
            mapping: mapping.response.text(),
            previousKnowledge: previousKnowledge.response.text(),
            instructionalStrategies: instructionalStrategies.response.text(),
            resources: resources.response.text(),
            introduction: introduction.response.text(),
            presentation: presentation.response.text(),
            blackboardWork: blackboardWork.response.text(),
            summarisation: summarisation.response.text(),
            assessmentQuestions: assessmentQuestions.response.text(),
            homeAssignment: homeAssignment.response.text(),
            suggestedReadings: suggestedReadings.response.text(),
            reflection: reflection.response.text(),}, `lessonPlan_${subject}_${grade}`)

            console.log('Lesson file path:', lessonFile);


        await LessonPlanModel.create({
            subject,
            grade,
            duration,
            content : content,
            creatorId : userId

        })

        res.download(lessonFile, (err) => {
            if(err) {
                console.log(`error while creating the file : ${err}`);
                res.status(500).send('unable to create file')
            } else {
                fs.unlinkSync(lessonFile)
            }
        })
          
    } catch (error) {
        console.error('Error during api request:', error.content?.data || error.message);
        res.status(500).json({
            msg : `something went wrong error : ${error}`

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