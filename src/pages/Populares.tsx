import React,{useEffect,useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Local } from '../../types/request';

const  Populares: React.FC = () => {
  const [locales,setLocales]  = useState<Local[] | null>(null)

  const llamadaLocales = async() : Promise<void> => {
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
    
    <div className="container " style={{height:'75vh'}}>
    <span></span> 
        <h1 className="text-primary text-center">Populares</h1>

        <div className='row'>
      
        <div className="col-md-12 col-xs-6 d-flex justify-content-start flex-wrap m-0 p-0">
            {locales !== null && locales.length > 0 ?  locales.map((val,i)=>(
             <>
             <div className="card col-3 m-1 p-0">
             <img className="card-img-top" style={{width:'100%',height:'150px'}} src={val.imagen} alt="Card image cap"/>
  <div className="card-body">
    <h4 className="card-title">{val.nombre}</h4>
    <p className='card-text'>Cantidad de likes {val.likes  ? val.likes.length : '0'  } 👍</p>
    <div className='d-flex flex-column'>

    <Link to={`/local/${val.id}`} className="btn btn-block  btn-primary">Ver local</Link>
  


    </div>
  </div>
</div>

             </>
            )) : 
            <>
           <h1>No hay locales con likes</h1>
            </>
            
            }
            
          </div>
        </div>

  </div>
  
  </>
  );
}

export default Populares;