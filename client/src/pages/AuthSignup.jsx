import React, {useState} from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import Input from '../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { inView } from 'framer-motion'
import { userCreateState, authMessageState, userProfileState, protectedRoutesState } from '../recoil/createUser.recoil'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { createUser } from '../apiFrontend/authHandler'
import { useEffect } from 'react'
import PasswordStrength from '../components/PasswordStrength'



const AuthSignup = () => {
  const [user, setUser] = useRecoilState(userCreateState)
  const [authMessage, setAuthMessage] = useRecoilState(authMessageState)
  const setUserProfile = useSetRecoilState(userProfileState)
  const setuserAuthenticated = useSetRecoilState(protectedRoutesState)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const userCreated = await createUser(user)

      if(!userCreated){
        setAuthMessage(true)
        return
      }

      localStorage.setItem('username', userCreated.username)
      document.cookie = `accessToken=${userCreated.accessToken}; path=/; secure`
      setUserProfile(true)
      setuserAuthenticated(true)
      

      navigate('/dashboard')
      setUser({email : '', password : '', username: ''})
    } catch (error) {
      console.log(error.message);
      
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthMessage(false)
    }, 4000);
  
    return () => {
      clearTimeout(timer)
    }
  }, [authMessage])
  

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
    <>
    <motion.div initial='initial' whileInView='inView' variants={signUpanimation} className='relative flex flex-col items-center justify-center h-screen'>
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
            {user.password && <PasswordStrength password={user.password}/>} 
            <div className=''>
                  <h1>Already have an account ? {" "} <Link to='/auth/signin' className='underline'>sign in </Link></h1>
            </div>
            

        </div>
    </motion.div>
    {
      authMessage && (
        <div className='absolute bg-blue-400 bottom-4 right-4 px-5 py-2 rounded-xl text-black'>
          <h1 className=' '>Invalid Credentials, try Again !</h1>
        </div>
      )
    }
    </>
  )
}

export default AuthSignup