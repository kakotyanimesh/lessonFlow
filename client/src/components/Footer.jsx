import React from 'react'
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className='relative flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-[#ddeefa] sm:mx-40 mx-5 rounded-xl'>
      <div className='absolute sm:-top-20 -top-12'><img src={logo} alt="" className='w-[100px] sm:w-[150px]' /></div>
      <div className='text-center space-y-5 pt-10'>
        <h1 className='sm:text-[40px] text-[20px]'>Boost Your Classroom Environment with AI powered Lesson Plans</h1>
        <button className='bg-gradient-to-r from-cyan-500 to-blue-700 text-white sm:p-3 text-xs p-2 rounded-xl shadow transition delay-200 hover:text-black shadow-cyan-500'>Get Started </button>
      </div>
      <div className='mt-10 pb-5 text-center text-sm text-gray-600'>
        © {new Date().getFullYear()} LessonFlow. All rights reserved. <a target='_blanck' href="https://twitter.com/_animeshkakoty"><FontAwesomeIcon icon={faTwitter} /></a>
      </div>
    </div>
  )
}

export default Footer