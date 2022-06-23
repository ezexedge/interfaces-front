import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory,Redirect,withRouter,Link } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.min.css';

const Registrar = () => {

  const [nombre,setNombre] = useState('')
  const [apellido,setApellido] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  const [cargando,setCargando] = useState(false)
  const history = useHistory();

  const login = async(e) => {

setCargando(true)

e.preventDefault();

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
  setCargando(false)
  toast.error(err.response.data.error, {
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

  if (redirect) {
    return <Redirect to={'/login'}/>;
}

  return (
    <div className="container">
    <div className="row">
        <div className=" d-flex justify-content-center">
        <form onSubmit={login}>
        <div className="form-group">
    <label for="formGroupExampleInput">Nombre</label>
    <input type="text" className="form-control"  onChange={(e)=>setNombre(e.target.value)} id="formGroupExampleInput" placeholder="Example input"/>
  </div>
  <div className="form-group">
    <label for="formGroupExampleInput">Apellido</label>
    <input type="text" className="form-control"  onChange={(e)=>setApellido(e.target.value)} id="formGroupExampleInput" placeholder="Example input"/>
  </div>
  <div className="form-group">
    <label for="formGroupExampleInput">Email</label>
    <input type="text" className="form-control"  onChange={(e)=>setEmail(e.target.value)} id="formGroupExampleInput" placeholder="Example input"/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Password</label>
    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}  id="formGroupExampleInput2" placeholder="Another input"/>
  </div>
  <button type="submit" className="btn btn-primary px-4 mt-3"  disabled={cargando === true ? true : false}>
  {cargando === true ?
  (
    <div class="spinner-border text-light" role="status">
</div>
  )
  :
  'Registrarme'
  }
  </button>
</form>

        </div>
    </div>

    <p className='text-center mt-3'>¿Tienes cuenta ?<Link className="mr-2" to="/login"> Iniciar sesion</Link></p>

  </div>
  );
}

export default Registrar
