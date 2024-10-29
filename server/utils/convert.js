// going to use officegen 
const officegen = require('officegen')
const fs = require('fs')
const { type } = require('os')


const createDocument = ({subject, topic, grade, duration, overviewText, curricularText, factualsText, conceptualText, proceduralText,essentialQuestionText, teachingPointText, sequentialActivityText, formativeAssesmentText, gptQuestionText, summarizationhomeText}) => {
    
    let docx = officegen({
        type: 'docx',
        orientation : 'landscape',
        title : 'LESSON PLAN'
    })

    let introTable = [
        [{val : "Lesson Plan no :  ", opts: { 
        }}
        ],
        [
            {val : "Date : " ,},
            ``,
            {val : "Subject : "},
            ` ${subject}`
        ],
        [
            {val : "Class : "},
            ` ${grade}`,
            {val : `Chapter : `},
            ` ${topic}`
        ],
        [
            {val : 'Time : '},
            ` ${duration}`,
            {val : 'Period : '},
            ``
        ]
    ]

    let introTableStyle = {
        tableColWidth: 4261,
        tableSize : 12,
        tableFontFamily: "Times New Roman",
        tableAlign : "left",
        borders : true
    }

    docx.createTable(introTable, introTableStyle)
    


    let overviewPara = docx.createP()
    overviewPara.addLineBreak()
    overviewPara.addText('Overview and Learning Objective', { bold: true, underline: true })
    overviewPara.addLineBreak()
    overviewPara.addText(overviewText)
    overviewPara.addLineBreak()

    let curricularPara = docx.createP()
    curricularPara.addText('Curricular Goals and Curricular competencies', { bold : true, underline : true})
    curricularPara.addLineBreak()
    curricularPara.addText(curricularText)
    curricularPara.addLineBreak()*2


    let tableOne = [
        [
            {val : 'Learning Objective', opts : { cellColWidth: 4261, } },
            {val : 'Curricular competencies ', opts : { cellColWidth: 4261} },
            {val : 'FACTUAL KNOWLEDGE', opts : { cellColWidth: 4261} },
            {val : 'CONCEPTUAL KNOWLEDGE', opts : { cellColWidth: 4261} },
            {val : 'PROCEDURAL KNOWLEDGE', opts : { cellColWidth: 4261} }
        ],
        [{val: 'LO-1'},  {val : 'CC-1 '},  { val : `${factualsText}`, }, { val : `${conceptualText}`, }, { val : `${proceduralText}`}  ]       
    ]


      docx.createTable(tableOne, introTableStyle)

    
      const essentialQuestion = docx.createP()
      essentialQuestion.addLineBreak()
      essentialQuestion.addText('Essential question', { bold : true, underline : true})
      essentialQuestion.addLineBreak()
      essentialQuestion.addText(essentialQuestionText)
      essentialQuestion.addLineBreak()

    let  presentationTable = [
        [
            {val : 'Teaching Points', opts : { cellColWidth: 4261, b: true,  fontFamily: "Arial" } },
            {val : 'Learning Outcomes', opts : { cellColWidth: 4261, b: true,  fontFamily: "Arial" } },
            {val : 'Sequential Learning Activities', opts : { cellColWidth: 4261, b: true,  fontFamily: "Arial" } },
            {val : 'Formative Assessment', opts : { cellColWidth: 4261, b: true,  fontFamily: "Arial" } },
            {val : 'Expected Queries', opts : { cellColWidth: 4261, b: true,  fontFamily: "Arial" } },  
        ],
        [{val: `${teachingPointText}`},{val: 'LO1, LO2'},{val : `${sequentialActivityText}`},{val : `${formativeAssesmentText}`},{val : `${gptQuestionText}`}],
        [{val: `${teachingPointText}`},{val: 'LO1, LO2'},{val : `${sequentialActivityText}`},{val : `${formativeAssesmentText}`},{val : `${gptQuestionText}`}]
    ]
      
    
    docx.createTable(presentationTable, introTableStyle)

    const summarizationandHomeWork = docx.createP()
    summarizationandHomeWork.addLineBreak()
    summarizationandHomeWork.addText('summarization And Home work : ', { bold: true, underline: true})
    summarizationandHomeWork.addLineBreak()
    summarizationandHomeWork.addText(`${summarizationhomeText}`)
    summarizationandHomeWork.addLineBreak()

    const teacherSignature = docx.createP()
    teacherSignature.addText('Signature of Teacher ', {bold : true, underline : true})


    let document = fs.createWriteStream(`${topic}.docx`)

    document.on('error' , (err) => {
        console.log(`error here ${err}`);
    })

    docx.generate(document)

    // document.out('close', () => {
    //     console.log('lesson Plan created Successfully ');
        
    // })
}


module.exports = {
    createDocument
}




