import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Faq from './pages/Faq'
import Pricing from './pages/Pricing'
import Layout from './components/Layout'

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App