import React from 'react'
import '../styles/Inicio.css'
import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <div className='container'>
      <h3 className='shoes'>ShoesApp</h3>
        <Link className='login' to={"/login"}>Login</Link>
        <Link className='register' to={"/register"}>Register</Link>
    </div>
  )
}

export default Inicio