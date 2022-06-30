import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';
import {GoogleMap,useLoadScript,Marker} from '@react-google-maps/api'
import DisqusThread from '../componentes/Disquis';
import { isAuth} from '../helpers'

const Local = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLEMAP
  })

    const [local,setLocal] = useState(null)
    const [like,setLike] = useState(false)
    const [dislike,setDislike] = useState(false)
    const [actualizar,setActualizar] = useState(false)

    const history = useHistory()
    
    const param = history.location.pathname.split('/')[2]

    const getLocal = async(id) =>{
        try{
          let resultado = await axios.get(`${process.env.REACT_APP_API_BACKEND}/locales/${id}`)
          
          setLocal(resultado.data.message)

          likeOrNotLike(resultado.data.message.likes)
          dislikeOrNotDislike(resultado.data.message.dislikes)

        }catch(err){
          console.log('error',err)
        }
        }


        const likes = async() => {

          try{
             await axios.put(`${process.env.REACT_APP_API_BACKEND}/likes/${history.location.pathname.split('/')[2]}/${isAuth().uid}`,{},{withCredentials:true})
            setActualizar(true)

          }catch(err){

          }

        }

        const dislikes = async() => {

          try{
            let result = await axios.put(`${process.env.REACT_APP_API_BACKEND}/dislikes/${history.location.pathname.split('/')[2]}/${isAuth().uid}`,{},{withCredentials:true})
            console.log('aca resultado like',result)
            setActualizar(true)
          }catch(err){

          }

        }


        const likeOrNotLike = (arr) => {
                let existe = arr.find(val => val === isAuth().uid)
                console.log('existe like',existe)

                if(existe ){
                  setLike(true)
                }else{
                  setLike(false)
                }
        }
        const dislikeOrNotDislike = (arr) => {
          let existe = arr.find(val => val === isAuth().uid)

          console.log('existe dislike',existe)

          if(existe){
            setDislike(true)
          }else{
            setDislike(false)
          }
  }

  const question = () => {
    alert('Debes estar logeado para realizar esta acción!')
  }
useEffect(()=>{

    if(param){
        getLocal(param)
    }
},[])



useEffect(()=>{

  if(actualizar === true){
    getLocal(param)
    setActualizar(false)
  }

},[actualizar])


const mapContainerStyle = {
  height: "190px",
  width: "100%",
  borderRadius:'6px'
};

    return ( 
        <div className="container">
          <div className='row'>
            <div className='col-12 d-flex flex-column  justify-content-center'>

         
                <h1 className='text-center text-primary'>{ local && local.nombre }</h1>
                <div style={{width:'80%',height:'500px',backgroundImage: `url(${local && local.imagen})`,backgroundRepeat:'no-repeat',backgroundPosition:'center center',margin:'auto',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                </div>
              

              
              
                <div className='d-flex justify-content-center m-4'>
                  <div className='d-flex align-items-center' onClick={isAuth()  && isAuth().uid ? likes : question }  >
                  <i class="fa fa-thumbs-up like" style={{color: like === true  ?'green' : 'black',cursor:'pointer'}} aria-hidden="true"></i>
                  <h4>{local && local.likes && local.likes.length}</h4>
                  </div>
                  <div  className='d-flex align-items-center m-4' onClick={isAuth()  && isAuth().uid ? dislikes : question }>
                  <i class="fa fa-thumbs-down dislike" style={{color: dislike === true  ?'red' : 'black',cursor:'pointer'}}  aria-hidden="true"></i>
                  <h4>{local && local.dislikes  && local.dislikes.length}</h4>

                  </div>


                </div>
            
                <h3 className='text-dark text-center mt-2'>Categoria :  {local && local.nombreCategoria ? local.nombreCategoria : ''} </h3>
                <p className='text-dark text-center mt-2'>Descripción : {local && local.descripcion} </p>
                <p className='text-dark text-center mt-2'>calle : {local && local.calle} , altura: {local && local.altura} </p>
                <div className="d-flex justify-content-center">
                <div class="alert alert-success col-3  mx-1" role="alert">
                <strong>Horario de apertura: </strong>
                {local && local.horaApertura}
              </div>
              <div class="alert alert-danger col-3 " role="alert">
                <strong>Horario de cierre: </strong>
                {local && local.horaCierre}
              </div>

                </div>
     

      


            { local !== null && local.latitud !== null && local.longitud !== null ? (

<div class="contenedor-mapas mt-4" style={{width:'100%',marginBottom:'33px',}}>
                <GoogleMap
                zoom={15}
                center={{lat:Number(local.latitud),lng: Number(local.longitud)}}
                mapContainerStyle={mapContainerStyle}
               
>
                  <Marker position={{lat:Number(local.latitud),lng:Number(local.longitud)}} />
                </GoogleMap>
                </div>
)
:
null
}
                </div>
                <DisqusThread  id={local && local.id} path={`/local/${local && local.id}`} /> 
          </div>
        </div>
     );
}
 
export default Local;