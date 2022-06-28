import React,{useEffect,useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const  Inicio = () => {


  const [locales,setLocales]  = useState(null)


  const llamadaLocales = async() =>{
    try{
      let resultado = await axios.get(`${process.env.REACT_APP_API_BACKEND}/locales`)
      
      setLocales(resultado.data.data)
    }catch(err){
      console.log('error',err)
    }
    }





  useEffect(()=>{


    llamadaLocales()

  },[])


  return (
    <>
    
    <div className="container ">
    <span></span> 
        <h1 className="text-primary text-center">Inicio</h1>

        <div className='row'>
      
        <div className="col-12  d-flex justify-content-between  flex-wrap m-0 p-0">
            {locales !== null && locales.length > 0 ?  locales.map((val,i)=>(
             <>
             <div class="card col-3 m-1 p-0">
  <img class="card-img-top" src={val.imagen} alt="Card image cap"/>
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
           <h1>NO hay locales</h1>
            </>
            
            }
            
          </div>
        </div>

  </div>
  
  </>
  );
}

export default Inicio;