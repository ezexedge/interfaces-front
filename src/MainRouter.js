import {BrowserRouter ,Switch, Route,Link} from 'react-router-dom' 
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Registrar from './pages/Registrar';
import CrearLocal from './pages/CrearLocal';
import PanelUser from './pages/PanelUser';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './componentes/PrivateRoute';
import Local from './pages/Local';
import 'react-toastify/dist/ReactToastify.min.css';
import Menu from './componentes/menu/Menu';
import Footer from './componentes/footer/footer';
import ResetPassword from './pages/ResetPassword';
import Populares from './pages/Populares';
import EditarLocal from './pages/EditarLocal';


function App() {
  return (
    <>

      <ToastContainer/>

         <Menu/>
    
        <Switch>
           
            <Route exact path="/" component={Inicio} />

            <Route  path="/login" component={Login} />

            <Route  path="/registrar" component={Registrar} />

            <Route  path="/local/:id" component={Local} />

            <Route  path="/reset-password" component={ResetPassword} />

            <Route  path="/populares" component={Populares} />

            <PrivateRoute  path="/crear-local" component={CrearLocal} />
            <PrivateRoute  path="/panel-usuario" component={PanelUser} />
            <PrivateRoute  path="/editar-local/:id" component={EditarLocal} />



        </Switch>
        <Footer/>
        </>

 
  );
}

export default App;