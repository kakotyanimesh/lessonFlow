import React from 'react'
import EduCtor from '../assets/illustrations/illustrationOne.svg'

const Home = () => {
  return (
    <div className='text-center sm:pt-28 pt-10'>
      <div className='sm:px-20 px-10 space-y-4'>
        <h1 className='sm:text-[60px] text-[25px]'>Streamline Your Lessons, Empower Your <span className='bg-gradient-to-r from-cyan-500 to-blue-700 bg-clip-text text-transparent'>Teaching</span></h1>
        <button className='bg-gradient-to-r from-cyan-500 to-blue-700 text-white sm:p-3 text-sm p-2 rounded-xl shadow transition delay-200 hover:text-black shadow-cyan-500'>Get Started </button>
      </div>
    </div>
  )
}

export default Home