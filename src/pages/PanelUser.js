import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { isAuth} from '../helpers'
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver'
import {Link} from 'react-router-dom'

import { useHistory,Redirect,withRouter } from "react-router-dom";


const  PanelUser = () => {

    const [locales,setLocales] = useState(null)
const [actualizar,setActualizar] = useState(false)
    const history = useHistory()

    const getLocalesByUser = async(id) => {
      try{
          const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}/locales/user/${id}`)
 console.log('lsls',result)
          setLocales(result.data.message)

      }catch(err){
        console.log('error',err)
      }
    }

    const confirmarEliminar = async(id) => {

      try{
      let pregunta = window.confirm("deseas eliminar este local")
      if(pregunta){
         await axios.delete(`${process.env.REACT_APP_API_BACKEND}/locales/${id}`)
         setActualizar(true)
         toast.success('eliminado correctamente', {
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
    }catch(err){
      console.log('erro al eliminar el local',err)
    }
     
    }

    const descargarImage = (id) => {
      saveAs(`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${process.env.REACT_APP_URL}/local/${id}&choe=UTF-8`, 'image.jpg') // Put your image url here.
  
    } 
  
    useEffect(()=>{

      getLocalesByUser(isAuth().uid)

    },[])

    useEffect(()=>{
      if(actualizar === true){
        getLocalesByUser(isAuth().uid)
        setActualizar(false)
      }
    },[actualizar])



    return (
      <div className='container' style={{marginBottom: '50vh'}}>
        <div className="row">
        <h1 className="text-primary text-center mt-2">Panel de usuario</h1>


        <div className='d-flex justify-content-center mt-3'>
        <button type="button" onClick={()=>history.push('/crear-local')} className="btn btn-success col-3">Crear local</button>

        </div>




        </div>

        <div className='row'>
        <h3 className="text-left mt-4 mb-4">Mis locales</h3>
        </div>
        <div className='row'>
        
        
          <div className="col-12  d-flex justify-content-between  flex-wrap m-0 p-0">
            {locales !== null && locales.length > 0 ?  locales.map((val,i)=>(
             <>
             <div class="card col-3 m-1 p-0">
             <img class="card-img-top" style={{width:'100%',height:'150px'}} src={val.imagen} alt="Card image cap"/>
  <div class="card-body">
    <h4 class="card-title">{val.nombre}</h4>
    <div className='d-flex flex-column'>

    <a onClick={()=>confirmarEliminar(val.id)} class="mb-2 btn btn-block  btn-danger">eliminar</a>
    <Link to={`/editar-local/${val.id}`}  class="btn btn-block  btn-primary">editar</Link>
    <a class="btn btn-link" onClick={()=>descargarImage(val.id)}>Descargar QR</a>



    </div>
  </div>
</div>

             </>
            )) : 
            <>
           <h1>El usuario no posee locales registrados :(</h1>
            </>
            
            }
            
          </div>
        </div>
        </div>
    );
  }
  
  export default PanelUser;