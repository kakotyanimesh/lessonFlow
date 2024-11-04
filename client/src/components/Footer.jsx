import React from 'react'
import { inView, motion } from 'framer-motion';
import logo from '../assets/logo.png'
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useRecoilState } from 'recoil';
import { userProfileState } from '../recoil/createUser.recoil';
import { useEffect } from 'react';
import UserProfile from '../pages/UserProfile';

const Footer = () => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState)

  useEffect(() => {
    
    const username = localStorage.getItem('username')

    if(username) setUserProfile(true)
  
    
  }, [])
  
  const footeAnimation = {
    initial : {opacity : 0, x: -40},
    inView : {opacity : 1 , x : 0 , transition : {duration : 0.9, ease : 'easeIn'}}
  }
  return (
    <motion.div initial='initial' whileInView='inView' variants={footeAnimation} className='relative flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-[#ddeefa] sm:mx-28 mx-5 rounded-xl'>
      <div className='absolute sm:-top-20 -top-12'><img src={logo} alt="" className='w-[100px] sm:w-[150px]' /></div>
      <div className='text-center space-y-5 pt-10'>
        <h1 className='sm:text-[36px] text-[20px]'>Boost Your Classroom Environment with AI powered Lesson Plans</h1>
        {
          !userProfile ? <Button prop={'Get Started'} link='/auth/signin' className='mt-10'/> : <Button prop={'Create Lesson Plan'} link='/dashboard' className='mt-10'/>
        }
      </div>
      <div className='mt-10 pb-5 text-center text-sm text-gray-600'>
        © {new Date().getFullYear()} LessonFlow. All rights reserved. <a target='_blanck' href="https://twitter.com/_animeshkakoty"><FontAwesomeIcon icon={faTwitter} /></a>
      </div>
    </motion.div>
  )
}

export default Footer