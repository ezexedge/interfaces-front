import {BrowserRouter ,Switch, Route,Link} from 'react-router-dom' 
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Registrar from './pages/Registrar';
import CrearLocal from './pages/CrearLocal';
import PanelUser from './pages/PanelUser';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './componentes/PrivateRoute';

import 'react-toastify/dist/ReactToastify.min.css';
import Menu from './componentes/menu/Menu';
import Local from './pages/Local';
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
    <>

      <ToastContainer/>

         <Menu/>
    
        <Switch>
           
            <Route exact path="/" component={Inicio} />

            <Route  path="/login" component={Login} />
            <Route  path="/local/:id" component={Local} />


            <Route  path="/registrar" component={Registrar} />
            <Route  path="/reset-password" component={ResetPassword} />

            <PrivateRoute  path="/crear-local" component={CrearLocal} />
            <PrivateRoute  path="/panel-usuario" component={PanelUser} />



        </Switch>

        </>

 
  );
}

export default App;