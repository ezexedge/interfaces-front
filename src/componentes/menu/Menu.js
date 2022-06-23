
import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import {isAuth,removeLocalStorage} from '../../helpers'
import axios from 'axios';
import { useHistory,withRouter,Route } from "react-router-dom";

const Menu = () => {

	const history = useHistory()
	console.log('sss',isAuth())

	const isAuthenticate = () => {
		if(typeof  window == 'undefined'){
			return false
		}
		if(localStorage.getItem('user')){
			return JSON.parse(localStorage.getItem('user'))
		}else{
			return false
		}
	}

	const cerrarSesion = async() => {

		try{

			let result = await axios.post(`${process.env.REACT_APP_API_BACKEND}/logout`, {},{withCredentials: true})
			console.log('logout',result)
			removeLocalStorage('user')
			history.push('/login')

		}catch(err){
			console.log('error',err)
		}
	}

  	return (
		<div>

		<nav className="navbar navbar-expand-lg navbar-dark  bg-primary ">
		<div className="container-fluid">
		  <a className="navbar-brand" href="#">24 HORAS</a>
		  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		  </button>
		  <div className="collapse navbar-collapse " id="navbarSupportedContent">
			<ul className="navbar-nav mx-auto">
			  <li className="nav-item">
				<Link to="/" className="nav-link" >Inicio</Link>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="#discovery">Categorias</a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="#service">Populares</a>
			  </li>
			
			</ul>

			{isAuth() &&
			 (
				<>
				<Link to="/panel-usuario" className="btn btn-success text-light mx-4" type="submit">Panel usuario</Link>
				<button onClick={cerrarSesion} className="btn btn-danger text-light" type="submit">Cerrar sesion</button>
				</>
			)}			
			{!isAuth() &&  ( 
				<>
			<Link to="/login" className="btn btn-success text-light" type="submit">Iniciar sesion</Link>
			</>
			)}
		
		  </div>
		</div>
	  </nav>
	  </div>
	
  	)
    
  

}

export default withRouter(Menu);

  