import React, {useState, useEffect, useCallback} from 'react'
import {delay, inView, motion} from 'framer-motion'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState, useRecoilValue } from 'recoil'
import UserProfilebtn from './UserProfilebtn'
import { userProfileState } from '../recoil/createUser.recoil'

const navLinks = [
  {name : "Home", url:'/'},
  {name : "About", url:'/about'},
  {name : "Pricing", url:'/pricing'},
  {name : "Faq", url:'/faq'}
]

const NavBar = () => {
  const navBarAnimation = {
    initial : {opacity : 0, y : -20},
    inView : {opacity : 1, y: 0, transition : {duration : 0.8, ease: "easeOut"}}
  }
  const [userProfile, setUserProfile] = useRecoilState(userProfileState)
  const [isNavbar, setIsNavbar] = useState(window.innerWidth < 769)
  const [toggleMenu, setToggleMenu] = useState(false)

  const menu = useCallback(() => {
    setIsNavbar(window.innerWidth < 769)
  }, [])
  useEffect(() => {

    window.addEventListener('resize', menu)

    if(toggleMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  
    return () => {
      window.removeEventListener('resize', menu)
      document.body.style.overflow = 'auto'
    }
  }, [menu, toggleMenu])

  // useEffect(() => {
  //   const cookie = document.cookie
  //   // console.log(cookie);
    
  //   const isAuthenticated = document.cookie.includes('accessToken')
  //   // console.log('Is Authenticated:', isAuthenticated);
  //   if(isAuthenticated) setUserProfile(true)
  
  // }, [])
  useEffect(() => {
    const isAuthenticated = document.cookie.includes('accessToken');
    // Set user profile state based on the authentication status
    setUserProfile(isAuthenticated);
}, [setUserProfile]);
 
  
  
  return (
    <motion.div variants={navBarAnimation} initial='initial' whileInView='inView' className='flex justify-between items-center  sm:px-16 px-10 text-xl' >
        <div>
          <Link to='/'><img src={logo} alt="" className='w-24 h-24'/></Link>
        </div>
        {
          !isNavbar ? (
            <>
            <ul className='flex gap-10'>
              {navLinks.map(nav => (
                <li key={nav.name} className='transition delay-200 hover:bg-[#c5dcee] p-1 rounded'>
                  <Link to={nav.url}>{nav.name}</Link>
                </li>
              ))}
            </ul>
              {
                userProfile ? <UserProfilebtn/>
                :
                <Link to='/auth/signin'><button className='transition hover:bg-[#c5dcee] p-2 rounded-xl delay-200 border-2 border-[#cffafe]'>signin</button></Link>
              }
            </>
            
          ) :
          <div className='flex gap-5'>
            {
              userProfile ? <UserProfilebtn/> :
              <Link to='/auth/signin'><button className='transition hover:bg-[#c5dcee] p-2 rounded-xl delay-200 border-2 border-[#cffafe]'>signin</button></Link>
            }

            <button onClick={() => setToggleMenu(!toggleMenu)}><FontAwesomeIcon icon={faBars} /></button>
          </div>
        }
        {
          isNavbar && toggleMenu && (
            <div className='absolute bg-[#c5dcee] bottom-0 top-0 left-0 right-0 flex flex-col h-screen items-center justify-center space-y-4'>
              <ul className='text-center space-y-4 '>
                {navLinks.map(nav => (
                  <li key={nav.name}>
                    <Link to={nav.url} onClick={() => setToggleMenu(false)}>{nav.name}</Link>
                  </li>
                ))}
              </ul>
            <button onClick={() => setToggleMenu(!toggleMenu)}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
          )
        }

    </motion.div>
  )
}

export default NavBar


