import React from 'react'
import logo from '../assets/logo.png'
import aboutIllustration from '../assets/illustrations/aboutIllustration.png'
import { motion } from 'framer-motion'

const About = () => {

  return (
    <div  className='mb-72'>
        <motion.div initial={{opacity : 0 , scale: 0}} whileInView={{opacity : 1, scale: 1, transition:{duration : 0.4}}} className='sm:mt-20 text-center flex flex-col items-center justify-center'>
        <img src={logo} alt="" className='h-40' />
        {/* <h1 className='text-4xl font-[900]'>About</h1> */}
        <p className='sm:leading-8 sm:pt-5 sm:text-2xl sm:px-96 px-10'>
        Creating lesson plans can be time-consuming and overwhelming. That's why I developed LessonFlow—a tool designed to make lesson planning quick, easy, and structured.        
        </p>
        <img src={aboutIllustration} alt="" className='h-[550px]' />
      </motion.div>
      <div className='flex flex-row items-start text-start text-center mx-72 justify-center gap-16'>
        <h1 className='font-[700] text-2xl text-left'>I built LessonFlow to simplify lesson planning for educators, so you don't have to struggle with time-consuming tasks.</h1>
        <p className='text-left text-lg'>
        As a B.Ed. trainee and aspiring developer, I saw the challenges teachers face in creating lesson plans. Traditional methods are often tedious and time-consuming. <br />

        LessonFlow changes that. Powered by the Gemini API, it generates structured lesson plans in seconds, letting teachers focus more on teaching. <br/>

        –The LessonFlow team
          
        </p>
      </div>
    </div>
  )
}

export default About