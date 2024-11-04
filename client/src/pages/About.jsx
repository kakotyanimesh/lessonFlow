import React from 'react'
import logo from '../assets/logo.png'
import aboutIllustration from '../assets/illustrations/aboutIllustration.png'
import { motion } from 'framer-motion'

const About = () => {

  return (
    <div  className='flex flex-col mb-10'>
        <motion.div initial={{opacity : 0 , x: -5}} whileInView={{opacity : 1, x: 0, transition:{duration : 0.4}}} className='sm:mt-20 text-center flex flex-col items-center justify-center'>
        <img src={logo} alt="" className='h-20' />
        {/* <h1 className='text-4xl font-[900]'>About</h1> */}
        <p className='sm:leading-8 sm:pt-5 sm:text-2xl sm:px-96 px-10'>
        Creating a lesson plan in Word is too boring , especially when it comes to formatting boxes and aligning everything properly. It's one of the most frustrating tasks to do on a laptop, so I decided to make it easier. Now, you can create a lesson plan quickly and then refine it as you like!  
        </p>
        <img src={aboutIllustration} alt="" className='h-[550px]' />
      </motion.div>
      <div className='flex flex-col items-start text-start text-center sm:mx-72 mx-10 justify-center gap-10'>
      <h1 className='font-[700] text-2xl text-left'>I built LessonFlow to simplify lesson planning for educators, so you don't have to struggle with time-consuming tasks.</h1>
        <p className='text-left text-lg'>
        As a B.Ed. trainee and aspiring developer, I saw the challenges teachers face in creating lesson plans. Traditional methods are often tedious and time-consuming. <br />

        LessonFlow changes that. Powered by the Gemini API, it generates structured lesson plans in seconds, letting teachers focus more on teaching. 
        I am kidding made this for me so that i dont have to give propmt to ai create everything, Thank You GEMINI API , i LOVE YOU 
        <br/>

        – KOTY
          
        </p>
      </div>
    </div>
  )
}

export default About