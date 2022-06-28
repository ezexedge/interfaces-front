import React,{useEffect,useState} from 'react';

import { Link } from "react-router-dom";


import axios from 'axios';

const  Populares = () => {
  const [locales,setLocales]  = useState(null)

  const llamadaLocales = async() =>{
    try{
      let resultado = await axios.get(`${process.env.REACT_APP_API_BACKEND}/locales-ordenados`)
      
      setLocales(resultado.data.data)
      console.log("resultado de locales",resultado)
    }catch(err){
      console.log('error',err)
    }
    }

    console.log('env',process.env)


  useEffect(()=>{


    llamadaLocales()

  },[])


  return (
    <>
    
    <div className="container ">
    <span></span> 
        <h1 className="text-primary text-center">Populares</h1>

        <div className='row'>
      
        <div className="col-12  d-flex justify-content-between  flex-wrap m-0 p-0">
            {locales !== null && locales.length > 0 ?  locales.map((val,i)=>(
             <>
             <div class="card col-3 m-1 p-0">
  <img class="card-img-top" src="https://ichef.bbci.co.uk/news/800/cpsprodpb/127AF/production/_110259657_tv058727610.jpg.webp" alt="Card image cap"/>
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

export default Populares;