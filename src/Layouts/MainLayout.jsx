import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Footer from '../Components/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return <>
  <NavBar/>
  
<div className='min-h-screen text-center flex items-center justify-center'>
<Outlet/>
  </div>
  <Footer/>
  
  </>
}
