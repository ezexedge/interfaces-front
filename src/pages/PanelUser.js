import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { isAuth} from '../helpers'
import { toast } from 'react-toastify';

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

    const descargarImage = (id) => {
      saveAs(`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${process.env.REACT_APP_URL}/local/${id}&choe=UTF-8`, 'image.jpg') // Put your image url here.
  
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
      <div className='container'>
        <div className="row">
        <h1 className="text-primary text-center mt-2">Panel de usuario</h1>

        <button type="button" onClick={()=>history.push('/crear-local')} className="btn btn-link">Crear local</button>




        </div>

        <div className='row'>
        <h3 className="text-left mt-4 mb-4">Mis locales</h3>
        </div>
        <div className='row'>
        
        
          <div className="col-12  d-flex justify-content-between  flex-wrap m-0 p-0">
            {locales !== null && locales.length > 0 ?  locales.map((val,i)=>(
             <>
             <div class="card col-3 m-1 p-0">
  <img class="card-img-top" src="https://ichef.bbci.co.uk/news/800/cpsprodpb/127AF/production/_110259657_tv058727610.jpg.webp" alt="Card image cap"/>
  <div class="card-body">
    <h4 class="card-title">{val.nombre}</h4>
    <div className='d-flex flex-column'>

    <a onClick={()=>confirmarEliminar(val.id)} class="mb-2 btn btn-block  btn-danger">eliminar</a>
    <a href="#!" class="btn btn-block  btn-primary">editar</a>
    <a href="#!" class="btn btn-link" onClick={()=>descargarImage(val.id)}>Descargar QR</a>



    </div>
  </div>
</div>

             </>
            )) : 
            <>
           <h1>NO hay locales</h1>
            </>
            
            }
            
          </div>
        </div>
        </div>
    );
  }
  
  export default PanelUser;