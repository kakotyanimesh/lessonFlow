import React from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import Input from '../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'


const Authsignin = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <div className=' text-center bg-blue-200 px-10 py-2 rounded-xl  '>
            <img src={logo} className='h-24 w-24 mx-auto' alt="" />
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
        
    </div>
  )
}

export default Authsignin