// going to use officegen 
const path = require('path')
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


    const filePath = path.join(__dirname, '..', 'lessonPlansDir', `${topic}.docx`)

    let document = fs.createWriteStream(filePath)

    return new Promise((resolve, reject) => {
        document.on('finish', () => {
            console.log('file created');
            resolve(filePath)
        })
        document.on('error', (err) => {
            console.log(err, 'error while creating docs');
            reject(err)
        })

        docx.generate(document)
    })

    

    
}


module.exports = {
    createDocument
}




/*
        document.on is a function or something that listens to streams => path for data, incoming data or outgoing data ( creation of document etc) and 
        so creating word document is outgoing  data => im taking data from my code and write it in file  when the stream is on the document.on fn listen to it and if error event happens its logs the error and when the finished means the doc is created => event listner is close here , the call back function runs and gives us the downloded thing 

        more in my notion docs =>https://www.notion.so/Stream-node-js-12e3bf53d78c809e81fbc314705b22ae
    */

    // document.on('close', () => {
    //     res.dowload(filePath,(err) => {
    //         if(err) {
    //             console.log(`error while sending the file ${err}`);
    //             res.status(500).json({msg : 'error while downloading the file'})
    //         } else {
    //             fs.unlinkSync(filePath, (err) => {
    //                 if(err) console.log(err);
    //             })
    //         }
    //     } )
    // })

    // document.out('close', () => {
    //     console.log('lesson Plan created Successfully ');
        
    // })