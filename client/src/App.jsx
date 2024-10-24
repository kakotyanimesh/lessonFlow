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

const App = () => {
  return (
    <div className='font-fontOne bg-[#ddeefa] min-h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/pricing' element={<Pricing/>}/>
            <Route path='/Faq' element={<Faq/>}/>
          </Route>
          {/* routes outside the layout thing  */}
          <Route path='/auth/signin' element={<Authsignin/>}/>
          <Route path='/auth/signup' element={<AuthSignup/>} />
          <Route path='*' element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App