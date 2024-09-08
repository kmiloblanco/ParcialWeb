import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import RegisterProduct from './pages/RegisterProduct';



function App() {

  return (
    <Routes>
      <Route exact path='/'element={<Inicio/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register'element={<Register/>}/>
      <Route path="/register-product" element={<RegisterProduct />} />
      <Route path='/home' element={<Home/>} />
    </Routes>
  )
}

export default App
