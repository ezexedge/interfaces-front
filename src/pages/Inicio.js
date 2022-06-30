import React,{useEffect,useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const  Inicio = () => {


  const [localesOriginal,setLocalesOriginal] = useState(null)
  const [locales,setLocales]  = useState(null)
  const [buscar,setBuscar] = useState('')
  


  const llamadaLocales = async() =>{
    try{
      let resultado = await axios.get(`${process.env.REACT_APP_API_BACKEND}/locales`)
      
      setLocales(resultado.data.data)
      setLocalesOriginal(resultado.data.data)
    }catch(err){
      console.log('error',err)
    }
    }


console.log('aca los locales',locales)

  useEffect(()=>{
    console.log('aca se actualiza',buscar)

    if(locales !== null && buscar !== ''){
      setLocales(localesOriginal.filter(val => val.nombre.includes(buscar.trim())))

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
    <div>
      <div className='buscador-banner'>
     
      <div class="form-group col-5 ">
        
    <input type="text" class="form-control buscador" onChange={(e)=>setBuscar(e.target.value)}  placeholder="Busca una tienda...."/>
  </div>
   
 
</div>
    <div className="container mt-5">
  


        <div className='row'>
      
        <div className="col-md-12 col-xs-6 d-flex justify-content-start flex-wrap m-0 p-0">
            {locales !== null && locales.length > 0 ?  locales.map((val,i)=>(
             <>
             <div class="card col-3 m-1 p-0">
  <img class="card-img-top" style={{width:'100%',height:'150px'}} src={val.imagen} alt="Card image cap"/>
  <div class="card-body">
    <h4 class="card-title">{val.nombre}</h4>
    <div className='d-flex flex-column'>

    <Link to={`/local/${val.id}`} class="btn btn-block  btn-primary">Ver local</Link>
  


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
  );
}

export default Inicio;