import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';
import DisqusThread from '../componentes/Disquis';
import { isAuth} from '../helpers'
import TimePicker from 'react-time-picker-input';
import "react-time-picker-input/dist/components/TimeInput.css"
import GoogleMap from "../componentes/GoogleMap";
import { toast } from 'react-toastify';


const EditarLocal = () => {


  const history = useHistory()
  const [inicio, setInicio] = useState(null);
  const [fin, setFin] = useState(null);
  const [latLng,setLatLng] = useState({
    lat: null,
    lng: null
  })
  const [cargando,setCargando] = useState(false)
  const [values, setValues] = useState({
    uploadedFiles: null,
     buttonText: 'Submit',
     uploadPhotosButtonText: 'Modificar imagen'
 });
  const [categoriasOptions,setCategoriasOptions] = useState(null)
  const [categorias,setCategorias] = useState(null)
  const [altura,setAltura] = useState(null)
  const [calle,setCalle] = useState(null)
  const [nombre,setNombre] = useState(null)
  const [descripcion,setDescripcion] = useState(null)  
  const [urlImage,setUrlImage] = useState(null)
  const {  uploadPhotosButtonText } = values;

console.log('latttt',latLng)

    const [local,setLocal] = useState(null)
    const [like,setLike] = useState(false)
    const [dislike,setDislike] = useState(false)
    const [actualizar,setActualizar] = useState(false)


    const onchange = (data) => {
        setLatLng(data)
    
      
        console.log("Form>", data);
      
     
    }
 
    const param = history.location.pathname.split('/')[2]

    const getLocal = async(id) =>{
        try{
          let resultado = await axios.get(`${process.env.REACT_APP_API_BACKEND}/locales/${id}`)
          
          setLocal(resultado.data.message)
          console.log("resultado de locales",resultado.data.message)
     
          setInicio(resultado.data.message.horaApertura)
          setFin(resultado.data.message.horaCierre)
          setLatLng({...latLng,lat: resultado.data.message.latitud,lng:resultado.data.message.longitud})
          setUrlImage(resultado.data.message.imagen)


        }catch(err){
          console.log('error',err)
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


   const editar = async(e) => {
    setCargando(true)
    
 
    e.preventDefault();
  try{
    
      let obj = {
    
        nombre: nombre === null ? local.nombre : nombre ,
        descripcion: descripcion === null ? local.descripcion : descripcion ,
        categoria: categorias === null ? local.categoria : categorias ,
        latitud: latLng.lat === null ? local.latitud :  latLng.lat,
        longitud: latLng.lat === null ? local.longitud : latLng.lng,
        horaCierre: fin === null ?  local.horaCierre : fin ,
        horaApertura: inicio === null ? local.horaApertura : inicio,
        calle: calle === null ? local.calle : calle,
        altura: altura === null ? local.altura : altura ,
        imagen:   values.uploadedFiles === null ? local.imagen : values.uploadedFiles[0].url,
       createdAt: local.createdAt,
        usuario: local.usuario,
        likes:local.likes,
        dislikes: local.dislikes
    
    
      }
    
    

    await axios.put(`${process.env.REACT_APP_API_BACKEND}/editar-local/${param}`, obj,{withCredentials:true})
    
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
    

useEffect(()=>{

console.log('aca param',param)
getCategorias()

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

           setUrlImage(result[0].url)
            setValues({
                ...values,
                uploadedFiles: result,
                uploadPhotosButtonText: `Imagen modificada`
            });
        }
    );
  };

return (
    <div class="container">
    <div class="row">

    <h1 className="text-primary text-center mt-2">Editar local</h1>

<img src={urlImage !== null ? urlImage:null} style={{width: 'auto',height:'300px'}} />
    <button onClick={() => uploadWidget()} className=" my-4 btn btn-outline-secondary btn-block p-5">
    {uploadPhotosButtonText}
              </button>


    <form onSubmit={editar}>



<div className="form-group  ">
  <label for="formGroupExampleInput">Nombre del local</label>
  <input type="text" className="form-control" defaultValue={local !== null && local.nombre?local.nombre:''}  onChange={(e)=>setNombre(e.target.value)}   id="formGroupExampleInput" placeholder="nombre del local"/>
</div>
<div className="form-group  ">
  <label for="formGroupExampleInput">Calle</label>
  <input type="text" className="form-control"  defaultValue={local !== null && local.calle?local.calle:''} onChange={(e)=>setCalle(e.target.value)}  id="formGroupExampleInput" placeholder="calle"/>
</div>
<div className="form-group  ">
  <label for="formGroupExampleInput">Altura</label>
  <input type="text" className="form-control"  defaultValue={local !== null && local.altura?local.altura:'' } onChange={(e)=>setAltura(e.target.value)}  id="formGroupExampleInput" placeholder="altura"/>
</div>
<div class="form-group">
  <label for="exampleFormControlTextarea1">Descripcion</label>
  <textarea  defaultValue={local !== null && local.descripcion ? local.descripcion: '' } onChange={(e)=>setDescripcion(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
<div className='d-flex mt-4 mb-4'>


  {inicio !== null && fin !== null ? 
  (
    <>
    
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

    </>
  )
  
  :
  
   null
  }

</div>
<div className='form-group mb-4 mt-4'>
  <label for="formGroupExampleInput">Selecciona una categoria</label>

  <select class="form-control form-control-lg"  onChange={(e)=>setCategorias(e.target.value)}>
  <option   value={null}>-- Selecciona una opción -- </option>
  {categoriasOptions !== null && categoriasOptions.map((option) => (
            <option   value={option.id} selected={local && local.categoria === option.id ? true : false}>{option.nombre}</option>
          ))}
</select>
  </div>


  <div >

    {latLng.lat !== null && latLng.lng !== null ? 
    <GoogleMap search={true}  data={latLng} onchange={(e) => { onchange(e) }} />

    :
    null
    }

</div>
<button type="submit" className="btn btn-primary px-4 mt-3"  
disabled={ cargando === false  ? false : true}>
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
 
export default EditarLocal