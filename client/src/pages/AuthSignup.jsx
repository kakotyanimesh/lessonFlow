import React from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import Input from '../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { inView } from 'framer-motion'


const AuthSignup = () => {
    const signUpanimation = {
        initial : {opacity : 0, y : -20},
        inView : {opacity : 1, y : 0, transition : {duration : 0.5}}
    }
  return (
    <motion.div initial='initial' whileInView='inView' variants={signUpanimation} className='flex flex-col items-center justify-center h-screen'>
        <div className=' text-center bg-blue-200 sm:px-12 px-5 sm:py-2 rounded-xl  '>
            <Link to='/'><img src={logo} className='h-24 w-24 mx-auto' alt="" /></Link>
            <h1 className='text-2xl'>Create an Account </h1>
            <div className='space-y-4 mt-3'>
                <Input type='text' placeholder='email' icon={<FontAwesomeIcon icon={faEnvelope} />}/>
                <Input type='text' placeholder='username' icon={<FontAwesomeIcon icon={faUser} />}/>
                <Input type='text' placeholder='password' icon={<FontAwesomeIcon icon={faLock} />}/>

                <Button prop={'sign up'}/>
                <div className=''>
                  <h1>Already have an account ? {" "} <Link to='/auth/signin' className='underline'>sign in </Link></h1>
                </div>
            </div>
        </div>
        
    </motion.div>
  )
}

export default AuthSignup