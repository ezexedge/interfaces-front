import React,{useEffect,useState,useContext, SyntheticEvent} from 'react';
import axios, {AxiosError} from 'axios';
import { toast } from 'react-toastify';
import { useHistory,withRouter,Route, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.min.css';
import Inicio from './Inicio';
import {getCookie, isAuth,authenticate,setCookie} from '../helpers'
import { validate } from 'react-email-validator';
import { TodoErrorResponse, TodoSuccessResponse,User } from '../../types/request';
class DateIsInFutureError extends RangeError {}



const Login : React.FC = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const history = useHistory();
  const [emailValidar,setEmailValidar] = useState(false)
  const [passwordValidar,setPasswordValidar] = useState(false)
  const [cargando,setCargando] = useState(false)
  const [msgError,setMsgError] = useState(false)


  const login = async(e: SyntheticEvent) => {
e.preventDefault();
setEmailValidar(false)
setPasswordValidar(false)


  if(validate(email) === false){
    setEmailValidar(true)
   
  }

  if(password.length < 6){
    setPasswordValidar(true)
 
  }

  if(validate(email) === false || password.length < 6) return

  setCargando(true)


try{

  let obj = {
    email: email.trim(),
    password: password
  }


 let result = await axios.post<TodoSuccessResponse>(`${process.env.REACT_APP_API_BACKEND}/login`, obj,{withCredentials:true})

  if(result.data.message){
    let data : User  = result.data.message
    authenticate(data)

    setCookie('jwt',data?.token || '')
   
    toast.info(`👋 Bienvenido ${result.data.message?.nombre} ${result.data.message?.apellido}!`, {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: 'dark'
     });
   
   isAuth() && history.push('/panel-usuario')
   
    console.log('aca result cookie',result.data.message)
   
   
  }





}catch(err){

  if(axios.isAxiosError(err) && err.response){

    let dataError : TodoErrorResponse  = err.response?.data as TodoErrorResponse

    setCargando(false)
  
    toast.error(dataError.error, {
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

 


  }
  function validateEmail(emailAdress : String) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }



useEffect(()=>{
  if(cargando === true){
    setEmailValidar(false)
    setPasswordValidar(false)
  }
},[cargando])



  return (
    <div className="container" style={{marginBottom:'20%'}}>
    <div className="row">
    <h1 className="text-primary text-center mt-2">Inicia sesion</h1>
        <div className=" d-flex justify-content-center">
        <form onSubmit={login}>
  <div className="form-group col-12">
    <label >Email</label>
    <input type="text" className="form-control"  onChange={(e)=>setEmail(e.target.value)} id="formGroupExampleInput" placeholder="ingrese email"/>
  </div>
  <div className="form-group col-12">
    <label >Password</label>
    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}  id="formGroupExampleInput2" placeholder="ingrese password"/>
  
  </div>

 

  <button type="submit" className="btn btn-primary px-4 mt-3"  disabled={cargando === true ? true : false }>
  {cargando === true ?
  (
    <div className="spinner-border text-light" role="status">
</div>
  )
  :
  'Iniciar sesión'
  }
  </button>
</form>

        </div>
        <div className="container">
          <div className='row col-12 d-flex justify-content-center   '>
          {emailValidar === true && (
 <p className='text-danger col-5 mt-3 text-bold text-center'>Debe ser un email valido </p>

)}
     </div>
     <div className='row col-12 d-flex justify-content-center   '>
     {passwordValidar === true && (
  <p className='text-danger col-5 mt-3 text-bold text-center'>password y el password debe ser mayor o igual 6 caracteres</p>
)}
      </div>

 </div>

     
    </div>
    <p className='text-center mt-3'>¿No tienes cuenta ?<Link className="mr-2" to="/registrar">  Registrarme</Link></p>
    <p className='text-center mt-4'><Link className="mr-2" to="/reset-password"> Olvidé mi contraseña </Link></p>

  </div>
  );
}
//Olvidé mi contraseña
export default Login;
