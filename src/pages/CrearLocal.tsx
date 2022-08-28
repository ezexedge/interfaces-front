import React,{useEffect,useState} from 'react';
import TimePicker from 'react-time-picker-input';
import "react-time-picker-input/dist/components/TimeInput.css"
import axios from 'axios'
import {isAuth} from '../helpers'
import { useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import GoogleMap from "../componentes/GoogleMap";
import ReactCloudinaryUploader from '@app-masters/react-cloudinary-uploader'

const  CrearLocal = () => {
  const [values, setValues] = useState({
   uploadedFiles: null,
    buttonText: 'Submit',
    uploadPhotosButtonText: 'Cargar una imagen'
});

  const history = useHistory()
  const [inicio, setInicio] = useState('10:00');
  const [fin, setFin] = useState('10:00');
  const [latLng,setLatLng] = useState({
    lat:-34.6685004,
    lng: -58.7282483
  })
  const [cargando,setCargando] = useState(false)

  const [categoriasOptions,setCategoriasOptions] = useState(null)
  const [categorias,setCategorias] = useState(null)
  const [altura,setAltura] = useState(null)
  const [calle,setCalle] = useState(null)
  const [nombre,setNombre] = useState(null)
  const [descripcion,setDescripcion] = useState(null)  
  const {  uploadPhotosButtonText } = values;


  const onchange = (data) => {
    setLatLng(data)

  
    console.log("Form>", data);
  
 
}

const crear = async(e) => {
setCargando(true)

try{
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
    imagen: values.uploadedFiles[0].url,
    usuario: isAuth().uid


  }


console.log('esto se muestra',obj)
 await axios.post(`${process.env.REACT_APP_API_BACKEND}/crear-local`, obj,{withCredentials:true})

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

}catch(err){
  console.log('aca error',err)

  toast.error('No se pudo crear', {
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


const subirImagen = () => {
    alert('hola')
}


const uploadWidget = () => {
  window.cloudinary.openUploadWidget(
      {
          cloud_name: "developer-gallardo",
          upload_preset: "geopins",
          multiple: false,
          tags: ['ebooks']
      },
      function(error, result) {
         console.log(result);
          setValues({
              ...values,
              uploadedFiles: result,
              uploadPhotosButtonText: `Imagen cargada`
          });
      }
  );
};



    return (
      <div class="container">
      <div class="row">

      <h1 className="text-primary text-center mt-2">Crear local</h1>
       <div className='mt-4'>
      { values.uploadedFiles === null ? <p>No se cargo una imagen</p> : (
        <img src={values.uploadedFiles[0].url}  style={{width: 'auto',height:'300px'}} />


      )}
      </div>
      <button onClick={() => uploadWidget()} className=" my-4 btn btn-primary col-3 ">
      {uploadPhotosButtonText}
                </button>


      <form onSubmit={crear}>

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
  disabled={  altura !== null && calle !== null && nombre !== null && categorias !== null && values.uploadedFiles !== null || cargando === true  ? false : true}>
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