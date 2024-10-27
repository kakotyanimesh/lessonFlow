import React, {useEffect} from 'react'
import { inView, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { logInUser } from '../apiFrontend/authHandler'
import logo from '../assets/logo.png'
import Input from '../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { userLoginState, authMessageState, userProfileState,protectedRoutesState } from '../recoil/createUser.recoil'


const Authsignin = () => {
  const [ logInData, setlogInData] = useRecoilState(userLoginState)
  const navigate = useNavigate()
  const [authMessage, setAuthMessage] = useRecoilState(authMessageState)
  const setUserProfile = useSetRecoilState(userProfileState)
  const setUserAuthenticated = useSetRecoilState(protectedRoutesState)

  const handleInput = (e) => {
    const {name, value } = e.target
    setlogInData((prevData) => ({
      ...prevData,
      [name] : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await logInUser(logInData)

      if(!user){
        setAuthMessage(true)
        return
      }

      localStorage.setItem('username', user.username)
      document.cookie = `accessToken=${user.accessToken}; path=/; secure`
      setUserProfile(true)
      setUserAuthenticated(true)

      setlogInData({email : '', password : ''})

      
      navigate('/dashboard')
    } catch (error) {
      console.log(`something went wrong ${error}`);
      
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthMessage(false)
    }, 6000);
  
    return () => {
      clearTimeout(timer)
    }
  }, [authMessage])
  

  const signinAnimation = {
    initial : {opacity : 0,  y : -20},
    inView : {opacity :1 , y: 0, transition : {duration : 0.5 }}
  }
  return (
    <>
    <motion.div initial='initial' whileInView='inView' variants={signinAnimation} className='relative w-full flex flex-col items-center justify-center h-screen'>
        <div className=' text-center bg-blue-200 sm:px-10 px-5 sm:py-2 rounded-xl  '>
            <Link to='/'><img src={logo} className='h-24 w-24 mx-auto' alt="" /></Link>
            <h1 className='text-2xl'>Welcome back </h1>
            <form onSubmit={handleSubmit} className='space-y-4 mt-3'>
                <Input type='email' name='email' placeholder='email' icon={<FontAwesomeIcon icon={faEnvelope} />} onChange={handleInput}/>
                <Input type='password' name='password' placeholder='password' icon={<FontAwesomeIcon icon={faLock} />} onChange={handleInput}/>
                <Link to='/auth/password'>forget password ? </Link> <br />
                <button type='submit' className='bg-gradient-to-r from-cyan-500 to-blue-700 text-white sm:p-3 text-xs p-2 rounded-xl shadow transition delay-200 hover:text-black shadow-cyan-500'>logIn</button>
            <div className=''>
                  <h1>Dont have account ?  <Link to='/auth/signup' className='underline'>sign up </Link></h1>
                </div>
            </form>
        </div>
    </motion.div>
    {
      authMessage && (
        <div className='absolute bottom-4 right-4 bg-blue-400 rounded-xl px-5 py-2'>
          <h1>Invalid Credentials, try Again ! </h1>
        </div>
      )
    }
    </>
  )
}

export default Authsignin