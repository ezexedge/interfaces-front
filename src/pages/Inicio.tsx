import React,{useEffect,useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {Local} from '../../types/request'
const  Inicio: React.FC = () => {


  const [localesOriginal,setLocalesOriginal] = useState< Local[] | null>(null)
  const [locales,setLocales]  = useState< Local[] | null>(null)
  const [buscar,setBuscar] = useState('')
  


  const llamadaLocales = async() =>{
    try{
      let resultado = await axios.get(`${process.env.REACT_APP_API_BACKEND}/locales`)
      
      setLocales(resultado.data.data)
      setLocalesOriginal(resultado.data)
    }catch(err){
      console.log('error',err)
    }
    }


console.log('aca los locales',locales)

  useEffect(()=>{
    console.log('aca se actualiza',buscar)

    if(locales !== null && buscar !== ''){
      let val : Local[] = localesOriginal.data?.filter(val => val.nombre.includes(buscar.trim()))
      setLocales(val)

    }
    if(locales !== null && buscar === ''){
      setLocales(localesOriginal)
      console.log('asi queeeda',locales)
    }



  },[buscar])

  useEffect(()=>{


    llamadaLocales()

  },[])


  return (
    <>
    <div>
      <div className='buscador-banner'>
     
      <div className="form-group col-5 ">
        
    <input type="text" className="form-control buscador" onChange={(e)=>setBuscar(e.target.value)}  placeholder="Busca una tienda...."/>
  </div>
   
 
</div>
    <div className="container mt-5">
  


        <div className='row'>
      
        <div className="col-md-12 col-xs-6 d-flex justify-content-start flex-wrap m-0 p-0">
            {locales !== null && locales.length > 0 ?  locales.map((val,i)=>(
             <>
             <div className="card col-3 m-1 p-0">
  <img className="card-img-top" style={{width:'100%',height:'150px'}} src={val.imagen} alt="Card image cap"/>
  <div className="card-body">
    <h4 className="card-title">{val.nombre}</h4>
    <div className='d-flex flex-column'>

    <Link to={`/local/${val.id}`} className="btn btn-block  btn-primary">Ver local</Link>
  


    </div>
  </div>
</div>

             </>
            )) : 
            <>
           <h1>No hay locales</h1>
            </>
            
            }
            
          </div>
        </div>

  </div>
  
  </div>
  </>
  );
}

export default Inicio;