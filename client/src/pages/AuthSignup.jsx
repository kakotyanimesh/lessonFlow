import React from 'react'

import Button from '../components/Button'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import Input from '../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'


const AuthSignup = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <div className=' text-center bg-blue-200 px-12 py-2 rounded-xl  '>
            <img src={logo} className='h-24 w-24 mx-auto' alt="" />
            <h1 className='text-2xl'>Create an Account </h1>
            <div className='space-y-4 mt-3'>
                <Input type='text' placeholder='email' icon={<FontAwesomeIcon icon={faEnvelope} />}/>
                <Input type='text' placeholder='username' icon={<FontAwesomeIcon icon={faUser} />}/>
                <Input type='text' placeholder='password' icon={<FontAwesomeIcon icon={faLock} />}/>

                <Button prop={'sign up'}/>
            </div>
        </div>
        
    </div>
  )
}

export default AuthSignup