import React , {useEffect, useState}from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { usernameState, lessonPlanForm } from '../recoil/createUser.recoil'
import  Input  from '../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMessage, faChalkboardUser, faClock } from '@fortawesome/free-solid-svg-icons'
import { genereatePlan } from '../apiFrontend/CreatePlan'

const Dashboard = () => {
  const [username, setUsername] = useRecoilState(usernameState)
  const [lpFrom, setlpFrom] = useState(false)
  const [lessonPlanData, setLessonPlanData] = useRecoilState(lessonPlanForm)

  useEffect(() => {
    const user = localStorage.getItem('username')
    if(user) {
      setUsername(user)
    }
    
  }, [])
  

  const handleInput = (e) => {
    const {name, value} = e.target

    setLessonPlanData((prevData) => ({
      ...prevData,
      [name]:name ==="grade" || name === "duration" ? Number(value) : value
    }))
  }
  

  const SubmitLessonData = async (e) => {
    e.preventDefault();
    try {
        const response = await genereatePlan(lessonPlanData);

        if (response?.data) {
            // Create a blob from the response data
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            const downloadUrl = URL.createObjectURL(blob);

            // Create an anchor element and trigger the download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${lessonPlanData.topic}.docx`;  // Set a filename for the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Revoke the object URL to free up memory
            URL.revokeObjectURL(downloadUrl);
        }
    } catch (error) {
        console.log('Error downloading file:', error);
    }
};


  
  return (
    <div className='flex flex-col items-center mt-24 '>
      <div className='flex sm:gap-20 gap-2 items-center'>
        <h1 className='sm:text-2xl text'>Welcome {username}</h1>
      </div>
      <div className='mt-5'>
        {
          lpFrom ?  (
            <form onSubmit={SubmitLessonData} className='space-y-4 text-center'>
              <div className='flex justify-between'>
                <label htmlFor="subject">Name of the Subject </label>
                <Input type='text' placeholder='subject' name='subject' onChange={handleInput} icon={<FontAwesomeIcon icon={faBook} />} /> 
              </div>
              <div className='flex justify-between'>
                <label htmlFor="topic">Name of your Topic</label>
                <Input type='text' placeholder='topic' name='topic' onChange={handleInput} icon={<FontAwesomeIcon icon={faMessage} />} />
              </div>
              <div className='flex justify-between gap-10' >
                <label htmlFor="Grade">Which Grade are you going to Teach </label>
                <Input type='number' placeholder='Grade' name='grade' onChange={handleInput} icon={<FontAwesomeIcon icon={faChalkboardUser} />} />
              </div>
              <div className='flex justify-between'>
                <label htmlFor="class Duration">Duration of your class</label>
                <Input type='number' placeholder='Duration of class ' name='duration' onChange={handleInput} icon={<FontAwesomeIcon icon={faClock} />} />

              </div>
              <button type='submit' className='bg-gradient-to-r from-cyan-500 to-blue-700 text-white sm:p-3 text-xs p-2 rounded-xl shadow transition delay-200 hover:text-black shadow-cyan-500'>create Plan </button>
            </form>
          ) :
<button className='bg-gradient-to-r from-cyan-500 to-blue-700 text-white sm:p-3 text-xs p-2 rounded-xl shadow transition delay-200 hover:text-black shadow-cyan-500' onClick={(e) => {
  e.preventDefault()
  setlpFrom(true)
}}>create Lesson Plan </button>
        }
      </div>
    </div>
  )
}

export default Dashboard
