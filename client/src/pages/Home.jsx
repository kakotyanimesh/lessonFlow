import React from 'react'
import { delay, easeIn, easeOut, inView, motion } from 'framer-motion'
import EduCtor from '../assets/illustrations/illustrationOne.svg'
import AITeacher from '../assets/illustrations/aiTeacher.svg'
import Testimonials from '../components/Testimonials'

const Home = () => {
  const headerAnimation = {
    initial : {opacity : 0, y : -50},
    inView : {opacity : 1, y: 0, transition : {duration : 1, ease: "easeOut"}}
  }
  const cardFrammer = {
    initial : {opacity: 0, x : -50 },
    inView : {opacity : 1, x : 0, transition : {duration : 1, ease : 'easeOut'}}
  }
  return (
    <div className='text-center sm:pt-48 sm:mt-7 mt-20 pb-32'>
      <motion.div variants={headerAnimation} initial='initial' whileInView='inView' className='sm:px-20 px-10  overflow-hidden'>
        <h1 className='sm:text-[64px] text-[24px]'>Streamline Your <span className='bg-gradient-to-r from-cyan-500 to-blue-700 bg-clip-text text-transparent'>Lessons</span>, Empower Your <br /> <span className='bg-gradient-to-r from-cyan-500 to-blue-700 bg-clip-text text-transparent'>Teaching</span></h1>
        <button className='bg-gradient-to-r from-cyan-500 to-blue-700 text-white mt-10 sm:p-3 text-xs p-2 rounded-xl shadow transition delay-200 hover:text-black shadow-cyan-500'>Get Started </button>
      </motion.div>
    <motion.div initial="initial" whileInView="inView" variants={cardFrammer} className='grid sm:grid-cols-2 mt-28 sm:mx-10 mx-5 gap-10'>
        <div className='flex sm:flex-row flex-col justify-center items-center bg-gradient-to-b from-blue-300 via-blue-200 to-[#ddeefa]  rounded-xl sm:gap-10 pb-4 sm:pb-0'>
          <img src={AITeacher} alt="" className='sm:h-[200px] h-[100px] sm:w-[200px] w-[100px] '/>
          <h1 className='sm:text-xl text-sm'>AI solutions for your everyday Classes</h1>
        </div>
        <div className=' flex justify-between sm:gap-10 gap-5 items-center'>
        <div className='bg-gradient-to-t from-blue-300 via-blue-200 to-[#ddeefa]  rounded-xl flex justify-center items-center sm:h-[200px] h-[150px] '>
          <h1 className='text-sm sm:text-xl'>Customized Lesson Plans with the proper method</h1>
        </div>
        <div className='bg-gradient-to-b from-blue-300 via-blue-200 to-[#ddeefa] rounded-xl flex justify-center items-center sm:h-[200px] h-[150px]'>

          <h1 className='text-sm sm:text-xl'>Maximized the productivity with AI solutions and improve your teaching Styles</h1>
        </div>
        </div>
      </motion.div>
      <div className='mt-24 sm:px-36 px-10'>
        <h1 className='sm:text-4xl text-[24px] mb-5'>Trusted by 5 teachers of my University </h1>
        <Testimonials/>
      </div>
    </div>
  )
}

export default Home