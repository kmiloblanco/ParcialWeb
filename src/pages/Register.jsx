import React, { useState } from 'react';
import '../styles/Register.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Register() {  
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrarservice = async (e) => {
    e.preventDefault();

    
    if (!name || !lastname || !email || !password) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    const data = {
      name: name,
      lastname: lastname,  
      email: email,
      password: password,
    };

    try {
      const resp = await axios.post("https://parcial.nucleoslabs.com.co/api/v1/usuarios/registrar", data);
      
      if (resp.status === 201) {
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar'
        });
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Algo salió mal. Inténtalo de nuevo más tarde.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className='containerRegister'>
      <h5 className='Login'>Register</h5>
      <form onSubmit={registrarservice}>    
        <input 
          type="text" 
          placeholder='Name' 
          className='Name' 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder='Last Name' 
          className='Lastname' 
          onChange={(e) => setLastname(e.target.value)}  
        />
        <input 
          type="email" 
          placeholder='Email' 
          className='Email' 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder='Password' 
          className='Pass' 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className='Submit'>Register</button>  
      </form>
    </div>
  );
}

export default Register;
