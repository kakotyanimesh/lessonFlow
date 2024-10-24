import React from 'react'
import { inView, motion } from 'framer-motion'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import Input from '../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'


const Authsignin = () => {
  const signinAnimation = {
    initial : {opacity : 0,  y : -20},
    inView : {opacity :1 , y: 0, transition : {duration : 0.5 }}
  }
  return (
    <motion.div initial='initial' whileInView='inView' variants={signinAnimation} className='w-full flex flex-col items-center justify-center h-screen'>
        <div className=' text-center bg-blue-200 sm:px-10 px-5 sm:py-2 rounded-xl  '>
            <Link to='/'><img src={logo} className='h-24 w-24 mx-auto' alt="" /></Link>
            <h1 className='text-2xl'>Welcome back </h1>
            <div className='space-y-4 mt-3'>
                <Input type='text' placeholder='email' icon={<FontAwesomeIcon icon={faEnvelope} />}/>
                <Input type='text' placeholder='password' icon={<FontAwesomeIcon icon={faLock} />}/>
                <Link to='/auth/password'>forget password ? </Link>
                <Button prop={'sign in'}/>
                <div className=''>
                  <h1>Dont have account ?  <Link to='/auth/signup'>sign up </Link></h1>
                </div>
            </div>
        </div>
        
    </motion.div>
  )
}

export default Authsignin