import React, {useState} from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import Input from '../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { inView } from 'framer-motion'
import { userCreateState } from '../recoil/createUser.recoil'
import { useRecoilState } from 'recoil'
import { createUser } from '../apiFrontend/authHandler'



const AuthSignup = () => {
  const [user, setUser] = useRecoilState(userCreateState)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const userCreated = await createUser(user)

      if(userCreated?.statusCode !== 200){
        console.log('unable to log in');
        return
      }

      navigate('/dashboard')
      
    } catch (error) {
      console.log(`something went wrongg ${error}`);
      
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser((prevData) => ({
      ...prevData,
      [name] : value
    }))
  }
  const signUpanimation = {
        initial : {opacity : 0, y : -20},
        inView : {opacity : 1, y : 0, transition : {duration : 0.5}}
    }
  return (
    <motion.div initial='initial' whileInView='inView' variants={signUpanimation} className='flex flex-col items-center justify-center h-screen'>
        <div className=' text-center bg-blue-200 sm:px-12 px-5 sm:py-2 rounded-xl  '>
            <Link to='/'><img src={logo} className='h-24 w-24 mx-auto' alt="" /></Link>
            <h1 className='text-2xl'>Create an Account </h1>
            <form onSubmit={handleSubmit} className='space-y-4 mt-3'>
              <Input type='email'  placeholder='email' onChange={handleInputChange} name='email'  icon={<FontAwesomeIcon icon={faEnvelope}/>} />
              <Input type='text' placeholder='username' onChange={handleInputChange} name='username'  icon={<FontAwesomeIcon icon={faUser}/>}  />
              <Input type='password' placeholder='password' onChange={handleInputChange} name='password' icon={<FontAwesomeIcon icon={faLock}/>}  />
              {/* <Button prop={'sign up'} type='submit'/> */}
              <button className='bg-gradient-to-r from-cyan-500 to-blue-700 text-white sm:p-3 text-xs p-2 rounded-xl shadow transition delay-200 hover:text-black shadow-cyan-500' type='submit'>submit</button>

            </form>
            <div className=''>
                  <h1>Already have an account ? {" "} <Link to='/auth/signin' className='underline'>sign in </Link></h1>
                </div>
        </div>
        
    </motion.div>
  )
}

export default AuthSignup