// going to use officegen 
const officegen = require('officegen')
const fs = require('fs')


const createDocument = ({overviewText, curricularText, factualsText, conceptualText, proceduralText}) => {
    let docx = officegen('docx')

    let title = docx.createP()
    title.addText('Lesson Plan ')
    title.addLineBreak()

    let overviewPara = docx.createP()
    overviewPara.addText('Overview and Learning Objective', { bold: true, underline: true })
    overviewPara.addText(overviewText)
    overviewPara.addLineBreak()

    let curricularPara = docx.createP()
    curricularPara.addText('Curricular Goals and Curricular competencies', { bold : true, underline : true})
    curricularPara.addText(curricularText)
    docx.putPageBreak()

    let tableOne = [
        [
            {val : 'Learning Objective', opts : { cellColWidth: 4261, b: true,  fontFamily: "Arial" } },
            {val : 'Curricular competencies ', opts : { cellColWidth: 4261, b: true, fontFamily: "Arial" } },
            {val : 'FACTUAL KNOWLEDGE', opts : { cellColWidth: 4261, b: true, fontFamily: "Arial" } },
            {val : 'CONCEPTUAL KNOWLEDGE', opts : { cellColWidth: 4261, b: true, fontFamily: "Arial" } },
            {val : 'PROCEDURAL KNOWLEDGE', opts : { cellColWidth: 4261, b: true, fontFamily: "Arial" } }
        ],
        [{val: 'LO-1'},  {val : 'CC-1 '},  { val : `${factualsText}`, }, { val : `${conceptualText}`, }, { val : `${proceduralText}`}  ],
        [{val: 'LO-2'},  {val : 'CC-2 '},  { val : `${factualsText}`, }, { val : `${conceptualText}`, }, { val : `${proceduralText}`}  ],
        [{val: 'LO-3'},  {val : 'CC-3 '},  { val : `${factualsText}`, }, { val : `${conceptualText}`, }, { val : `${proceduralText}`}  ]        
    ]

    const tableStyle = {
        tableColWidth: 4261,
        tableSize: 24,
        tableAlign: "center",
        tableFontFamily: "Arial"
      }

      docx.createTable(tableOne, tableStyle)
      docx.putPageBreak()

    //   console.log('animehsh kakot');

    const presentationTable = [
        [
            {val : 'Teaching Points', opts : { cellColWidth: 4261, b: true,  fontFamily: "Arial" } },
            {val : 'Learning Outcomes', opts : { cellColWidth: 4261, b: true,  fontFamily: "Arial" } },
            {val : 'Sequential Learning Activities', opts : { cellColWidth: 4261, b: true,  fontFamily: "Arial" } },
            {val : 'Formative Assessment', opts : { cellColWidth: 4261, b: true,  fontFamily: "Arial" } },
            {val : 'Expected Queries', opts : { cellColWidth: 4261, b: true,  fontFamily: "Arial" } },  
        ],
        [{val: 'anims'},{val: 'LO1, LO2'},{val : `activity from gpt`},{val : `questions from gpt`}],
        [{val: 'anims'},{val: 'LO1, LO2'},{val : `activity from gpt`},{val : `questions from gpt`}],
        [{val: 'anims'},{val: 'LO1, LO2'},{val : `activity from gpt`},{val : `questions from gpt`}],
        [{val: 'anims'},{val: 'LO1, LO2'},{val : `activity from gpt`},{val : `questions from gpt`}]
    ]
      
    
    docx.createTable(presentationTable, tableStyle)

    let document = fs.createWriteStream('lessonplan.docx')

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




