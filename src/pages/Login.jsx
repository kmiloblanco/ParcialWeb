import React, { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");

  const loginservice = async (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingresa tu correo electrónico y contraseña',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    const data = {
      email: email,  
      password: password,
    };

    try {
      const resp = await axios.post("https://parcial.nucleoslabs.com.co/api/v1/usuarios/login", data);
      
      if (resp.status === 200) {
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido de nuevo!',
          icon: 'success',
          confirmButtonText: 'Continuar'
        });

        
        const { access_token } = resp.data;
        localStorage.setItem('token', access_token);

        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className='containerLogin'>
      <h5 className='Login'>Login</h5>
      <form onSubmit={loginservice}>
        <input 
          type="email" 
          placeholder='Email' 
          className='User' 
          onChange={(e) => setEmail(e.target.value)}  
        />
        <input 
          type="password" 
          placeholder='Password' 
          className='Pass' 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className='Submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
