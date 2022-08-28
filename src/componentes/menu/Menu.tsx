
import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import {isAuth,removeLocalStorage,removeCookie} from '../../helpers'
import axios from 'axios';
import { useHistory,withRouter,Route } from "react-router-dom";

const Menu : React.FC = () => {

	const history = useHistory()
	console.log('sss',isAuth())

	const isActive = (history: any,path:string) => {
		if(history.location.pathname === path) return {color:"#fff"}
			else return {color: "#fff",opacity:'0.5'}
	}
	

	const isAuthenticate = () => {
		if(typeof  window == 'undefined'){
			return false
		}
		if(localStorage.getItem('user')){
			return JSON.parse(localStorage.getItem('user') || '')
		}else{
			return false
		}
	}

	const cerrarSesion = async() => {

		try{

			let result = await axios.post(`${process.env.REACT_APP_API_BACKEND}/logout`, {},{withCredentials: true})
			console.log('logout',result)
			removeCookie('jwt')
			removeLocalStorage('user')
			history.push('/login')

		}catch(err){
			console.log('error',err)
		}
	}

  	return (
		<div>

		<nav className="navbar navbar-expand-lg navbar-dark  nav-menu ">
		<div className="container pt-0 mt-0">
		  <Link className="navbar-brand" to="/" >24 HORAS</Link>
		  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		  </button>
		  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav mx-auto">
			  <li className="nav-item">
				<Link to="/" style={isActive(history,`/`)}  className="nav-link " >Inicio</Link>
			  </li>
			  
			  <li className="nav-item">
				<Link style={isActive(history,`/populares`)}   className="nav-link" to="/populares">Populares</Link>
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

  