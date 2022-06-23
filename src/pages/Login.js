import React,{useEffect,useState,useContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory,withRouter,Route, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.min.css';
import Inicio from './Inicio';
import {getCookie, isAuth,authenticate} from '../helpers'

function Login() {

  const [email,setEmail] = useState('')
  const [user,setUser] = useState()
  const [password,setPassword] = useState('')
  const history = useHistory();
  const [redirect,setRedirect] = useState(false)
  const [cargando,setCargando] = useState(false)


  const login = async(e) => {
e.preventDefault();

setCargando(true)

try{

  let obj = {
    email: email.trim(),
    password: password
  }

  console.log('obb',obj)

 let result = await axios.post(`${process.env.REACT_APP_API_BACKEND}/login`, obj,{withCredentials:true})
 


 authenticate(result.data.message)

 toast.info(`👋 Bienvenido ${result.data.message.nombre} ${result.data.message.apellido}!`, {
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
    <div className="container">
    <div className="row">
        <div className=" d-flex justify-content-center">
        <form onSubmit={login}>
  <div className="form-group">
    <label for="formGroupExampleInput">Email</label>
    <input type="text" className="form-control"  onChange={(e)=>setEmail(e.target.value)} id="formGroupExampleInput" placeholder="ingrese email"/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Password</label>
    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}  id="formGroupExampleInput2" placeholder="ingrese password"/>
  </div>
  <button type="submit" className="btn btn-primary px-4 mt-3"  disabled={cargando === true ? true : false}>
  {cargando === true ?
  (
    <div class="spinner-border text-light" role="status">
</div>
  )
  :
  'Iniciar sesión'
  }
  </button>
</form>

        </div>
    </div>
    <p className='text-center mt-3'>¿No tienes cuenta ?<Link className="mr-2" to="/registrar">  Registrarme</Link></p>
    <p className='text-center mt-4'><Link className="mr-2" to="/reset-password"> Olvidé mi contraseña </Link></p>

  </div>
  );
}
//Olvidé mi contraseña
export default Login;
