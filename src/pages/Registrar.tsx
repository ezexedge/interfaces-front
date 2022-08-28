import React,{SyntheticEvent, useEffect,useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory,Redirect,withRouter,Link } from "react-router-dom";
import { validate } from 'react-email-validator';

import 'react-toastify/dist/ReactToastify.min.css';
import { TodoErrorResponse } from '../../types/request';

const Registrar = () => {

  const [nombre,setNombre] = useState('')
  const [apellido,setApellido] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  const [cargando,setCargando] = useState(false)
  const [nombreValidar,setNombreValidar] = useState(false)
  const [apellidoValidar,setApellidoValidar] = useState(false)
  const [passwordValidar,setPasswordValidar] = useState(false)
  const [emailValidar,setEmailValidar] = useState(false)
  const history = useHistory();

  const registrarme = async(e : SyntheticEvent) => {
    setEmailValidar(false)
    setPasswordValidar(false)
    setNombreValidar(false)
    setApellidoValidar(false)

e.preventDefault();

if(validate(email) === false){
  setEmailValidar(true)
}

if(password.length < 6){
  setPasswordValidar(true)
}

if(nombre === ''){
  setNombreValidar(true)

}

if(apellido === ''){
  setApellidoValidar(true)

}


if(validate(email) === false || password.length < 6 || apellido === '' || nombre === '')return

setCargando(true)


try{

      let obj = {
      email: email,
      password: password,
      nombre: nombre,
      apellido: apellido
    }

     await axios.post(`${process.env.REACT_APP_API_BACKEND}/registrar`, obj)
    
     setCargando(false)
     toast.success('Has creado una cuenta , ahora inicia sesión', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
      });

    
     history.push('/login')

     
}catch(err){
  if(axios.isAxiosError(err) && err.response){

    let dataError : TodoErrorResponse  = err.response?.data as TodoErrorResponse


    setCargando(false)
  toast.error(dataError.error , {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
    });

  console.log('error',err)
  }


}



  }

  if (redirect) {
    return <Redirect to={'/login'}/>;
}

  return (
    <div className="container" style={{marginBottom:'20%'}}>
    <div className="row">
    <h1 className="text-primary text-center mt-2">Crear cuenta</h1>
    <p className="text-primary text-center mt-2">Encuentra los locales 24 horas mas cercanos ¡en un solo lugar!</p>
        <div className=" d-flex justify-content-center">
        <form onSubmit={registrarme}>
        <div className="form-group">
    <label >Nombre</label>
    <input type="text" className="form-control"  onChange={(e)=>setNombre(e.target.value)} id="formGroupExampleInput" placeholder="Example input"/>
  </div>
  <div className="form-group">
    <label >Apellido</label>
    <input type="text" className="form-control"  onChange={(e)=>setApellido(e.target.value)} id="formGroupExampleInput" placeholder="Example input"/>
  </div>
  <div className="form-group">
    <label >Email</label>
    <input type="text" className="form-control"  onChange={(e)=>setEmail(e.target.value)} id="formGroupExampleInput" placeholder="Example input"/>
  </div>
  <div className="form-group">
    <label >Password</label>
    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}  id="formGroupExampleInput2" placeholder="Another input"/>
  </div>
  <button type="submit" className="btn btn-primary px-4 mt-3"  disabled={cargando === true ? true : false}>
  {cargando === true ?
  (
    <div className="spinner-border text-light" role="status">
</div>
  )
  :
  'Registrarme'
  }
  </button>
</form>


        </div>
        <div className="msg-error container">
          <div className='row col-12 d-flex justify-content-center  '>
          {emailValidar === true && (
 <p className='text-danger col-5 mt-3 text-bold text-center'>Debe ser un email valido </p>

)}
</div>
<div className='row col-12 d-flex justify-content-center  '>
{passwordValidar === true && (
  <p className='text-danger col-5 mt-3 text-bold text-center'>password y el password debe ser mayor o igual 6 caracteres</p>
)}
</div>
<div className='row col-12 d-flex justify-content-center  '>
{nombreValidar === true && (
  <p className='text-danger col-5 mt-3 text-bold text-center'>Es obligatorio llenar el  campo nombre</p>
)}
</div>
<div className='row col-12 d-flex justify-content-center  '>
{apellidoValidar === true && (
  <p className='text-danger col-5 mt-3 text-bold text-center'>Es obligatorio llenar el  campo de apellido</p>
)}
</div>


 </div>
    </div>

    <p className='text-center mt-3'>¿Tienes cuenta ?<Link className="mr-2" to="/login"> Iniciar sesion</Link></p>

  </div>
  );
}

export default Registrar
