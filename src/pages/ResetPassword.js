import React,{useEffect,useState,useContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory,withRouter,Route, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.min.css';
import Inicio from './Inicio';
import {getCookie, isAuth,authenticate} from '../helpers'
import { validate } from 'react-email-validator';

function ResetPassword() {

  const [email,setEmail] = useState('')
  const [user,setUser] = useState()
  const [password,setPassword] = useState('')
  const history = useHistory();
  const [redirect,setRedirect] = useState(false)
  const [cargando,setCargando] = useState(false)
  const [validarEmail,setValidarEmail] = useState(false)


  const reset = async(e) => {
e.preventDefault();

setValidarEmail(false)

if(validate(email) === false){
  setValidarEmail(true)
}

if(validate(email) === false) return

setCargando(true)

try{

 


 let result = await axios.post(`${process.env.REACT_APP_API_BACKEND}/reset-password/${email.trim()}`,{},{withCredentials:true})
 


 authenticate(result.data.message)

 toast.success(`Revisa tu bandeja de entrada para obtener tu nueva contraseña(SPAM)`, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored'
  });

  setCargando(false)





}catch(err){
  setCargando(false)

  console.log('err',err)

  toast.error('error', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
    });

}

 


  }





  return (
    <div className="container" style={{marginBottom:'30%'}}>
    <div className="row">
    <h1 className="text-primary text-center mt-2">Cambiar contraseña</h1>
    <p className="text-primary text-center mt-2">Vamos a enviarte un email para que puedas cambiar tu contraseña.</p>
        <div className=" d-flex justify-content-center">
        <form onSubmit={reset}>
  <div className="form-group">
    <label for="formGroupExampleInput">Email</label>
    <input type="text" className="form-control"  onChange={(e)=>setEmail(e.target.value)} id="formGroupExampleInput" placeholder="ingrese email"/>
  </div>

  <button type="submit" className="btn btn-primary px-4 mt-3"  disabled={cargando === true ? true : false}>
  {cargando === true ?
  (
    <div class="spinner-border text-light" role="status">
</div>
  )
  :
  'Reestablecer contraseña'
  }
  </button>
</form>

        </div>
        <div className='container'>
          <div className="row d-flex justify-content-center">
          {validarEmail === true && (
  <p className='text-danger col-5 mt-3 text-bold text-center'>password y el password debe ser mayor o igual 6 caracteres</p>
)}
          </div>
        </div>
    </div>
    <p className='text-center mt-3'>¿No tienes cuenta ?<Link className="mr-2" to="/login">  Iniciar sesión</Link></p>

  </div>
  );
}
//Olvidé mi contraseña
export default ResetPassword;