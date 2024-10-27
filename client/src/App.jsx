import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Faq from './pages/Faq'
import Pricing from './pages/Pricing'
import Layout from './components/Layout'
import Authsignin from './pages/Authsignin'
import AuthSignup from './pages/AuthSignup'
import NoPage from './pages/NoPage'
import Dashboard from './pages/Dashboard'
import { RecoilRoot } from 'recoil'
import UserProfile from './pages/UserProfile'
import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => {
  return (
    <div className='font-fontOne bg-[#ddeefa] min-h-screen'>
      <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/pricing' element={<Pricing/>}/>
            <Route path='/Faq' element={<Faq/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/user/profile' element={<UserProfile/>} />
            </Route>
          </Route>
          {/* routes outside the layout thing  */}
          <Route path='/auth/signin' element={<Authsignin/>}/>
          <Route path='/auth/signup' element={<AuthSignup/>} />
          <Route path='*' element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App