import React,{useEffect,useState} from 'react';
import TimePicker from 'react-time-picker-input';
import "react-time-picker-input/dist/components/TimeInput.css"
import axios from 'axios'
import {isAuth} from '../helpers'
import { useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import GoogleMap from "../componentes/GoogleMap";

const  CrearLocal = () => {

  const history = useHistory()
  const [inicio, setInicio] = useState('10:00');
  const [fin, setFin] = useState('10:00');
  const [latLng,setLatLng] = useState({
    lat:-34.6685004,
    lng: -58.7282483
  })
  const [categoriasOptions,setCategoriasOptions] = useState(null)
  const [categorias,setCategorias] = useState(null)
  const [altura,setAltura] = useState(null)
  const [calle,setCalle] = useState(null)
  const [nombre,setNombre] = useState(null)
  const [descripcion,setDescripcion] = useState(null)  
  const [cargando,setCargando] = useState(false)

  const onchange = (data) => {
    setLatLng(data)

  
    console.log("Form>", data);
  
 
}

console.log('aca tengo a categoira',categorias)

const crear = async(e) => {

e.preventDefault();

  let obj = {

    nombre: nombre,
    descripcion: descripcion,
    categoria: categorias,
    latitud: latLng.lat,
    longitud: latLng.lng,
    horaCierre: fin,
    horaApertura: inicio,
    calle: calle,
    altura: altura,
    imagen: 'https://ichef.bbci.co.uk/news/800/cpsprodpb/127AF/production/_110259657_tv058727610.jpg.webp',
    usuario: isAuth().uid


  }


console.log('esto se muestra',obj)
 await axios.post('http://localhost:5000/api/crear-local', obj)

 toast.success('creado correctamente', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored'
  });
history.push('/panel-usuario')
}

const getCategorias = async() => {
 try{
  const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}/categorias`)
  setCategoriasOptions(result.data.data)
 }catch(err){
console.log('error categorias',err)
 }
 

}

useEffect(()=>{

  console.log('aca is auth',isAuth().uid)

  getCategorias()
},[])

    return (
      <div class="container">
      <div class="row">
      <h1 className="text-primary text-center mt-2">Crear local</h1>

      <form onSubmit={crear}>

  
 
  <div className="form-group  ">
    <label for="formGroupExampleInput">Nombre del local</label>
    <input type="text" className="form-control" onChange={(e)=>setNombre(e.target.value)}   id="formGroupExampleInput" placeholder="nombre del local"/>
  </div>
  <div className="form-group  ">
    <label for="formGroupExampleInput">Calle</label>
    <input type="text" className="form-control"  onChange={(e)=>setCalle(e.target.value)}  id="formGroupExampleInput" placeholder="calle"/>
  </div>
  <div className="form-group  ">
    <label for="formGroupExampleInput">Altura</label>
    <input type="text" className="form-control" onChange={(e)=>setAltura(e.target.value)}  id="formGroupExampleInput" placeholder="altura"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Descripcion</label>
    <textarea onChange={(e)=>setDescripcion(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <div className='d-flex mt-4 mb-4'>
  <div className="form-group  ">
    <label for="formGroupExampleInput">Horario apertura</label>
    <TimePicker
    hour12Format
    eachInputDropdown
    manuallyDisplayDropdown
                onChange={(newValue)=>setInicio(newValue)}
                value={inicio}
            />
  </div>
  <div className="form-group  ">
    <label for="formGroupExampleInput">Horario cierre</label>
    <TimePicker
    hour12Format
    eachInputDropdown
    manuallyDisplayDropdown
                onChange={(newValue)=>setFin(newValue)}
                value={fin}
            />
  </div>
  </div>
    
    <div className='form-group mb-4 mt-4'>
    <label for="formGroupExampleInput">Selecciona una categoria</label>

    <select class="form-control form-control-lg" onChange={(e)=>setCategorias(e.target.value)}>
    <option   value={null}>-- Selecciona una opción -- </option>
    {categoriasOptions !== null && categoriasOptions.map((option) => (
              <option   value={option.id}>{option.nombre}</option>
            ))}
</select>
    </div>
  
  <div >
  <GoogleMap search={true}  data={latLng} onchange={(e) => { onchange(e) }} />

  </div>
  <button type="submit" className="btn btn-primary px-4 mt-3"  
  disabled={  altura !== null && calle !== null && nombre !== null && categorias !== null || cargando === true  ? false : true}>
  {cargando === true ?
  (
    <div class="spinner-border text-light" role="status">
</div>
  )
  :
  'Crear local'
  }
  </button>
</form>
    

      </div>

    </div>

    );
  }
  
  export default CrearLocal;