// make a function that converts text to docs using docx library
const fs = require('fs')
const docx = require("docx");
const { Document, Packer, Paragraph, TextRun } = docx


const paragaphWriting = (heading, content, headingSize = 24, contentSize = 20) => {
    return [
        new Paragraph({
            children : [
                new TextRun({
                    text : heading,
                    bold : true,
                    size : headingSize
                })
            ]
        }),

        new Paragraph({
            children : [
                new TextRun({
                    text : content,
                    size : contentSize,
                    break : 1
                })
            ]
        })
    ]
}


const createDocx = async ({
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
}, fileName) => {
    try {
        const doc = new Document({
            sections : [
                {
                    properties : {},
                    children : [
                        ...paragaphWriting('1.Overview of the lesson', overview),
                        ...paragaphWriting('2.Learning Points', learningPoints),
                        ...paragaphWriting('3.Curricular Goals', curricularGoals),
                        ...paragaphWriting('4.Curricular Competencies', curricularCompetencies),
                        ...paragaphWriting('5.Mapping of Learning Outcomes with Curricular Competencies table ', mapping),
                        ...paragaphWriting('6.Previous Knowledge', previousKnowledge),
                        ...paragaphWriting('7.Instructional Strategies', instructionalStrategies),
                        ...paragaphWriting('8.Teaching-Learning Resources', resources),
                        ...paragaphWriting('9.Instruction', introduction),
                        ...paragaphWriting('10.Presentation // table', presentation),
                        ...paragaphWriting('11.blackboardWork // image ', blackboardWork),
                        ...paragaphWriting('12.summarisation', summarisation),
                        ...paragaphWriting('13.assessmentQuestions', assessmentQuestions),
                        ...paragaphWriting('14.homeAssignment', homeAssignment),
                        ...paragaphWriting('15.suggestedReadings', suggestedReadings),
                        ...paragaphWriting('16.reflection', reflection)
                    ]
                }
            ]
        })

        const buffer = await Packer.toBuffer(doc)
        const filePath = `${fileName}.docx`
        fs.writeFileSync(filePath, buffer)

        console.log(`${filePath} created successfully`);
        return filePath
        
        
    } catch (error) {
        console.log(`unable to create file`);
        throw error
    }
}

module.exports = {
    createDocx
}