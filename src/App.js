import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './components/auth/Login';
import NewAcount from './components/auth/NewAcount';
import ServicesMenu from './components/services/ServicesMenu';

import ServiceState from './context/services/ServiceState';
import TicketState from './context/tickets/TicketState';
import AlertState from './context/alerts/AlertState';
import AuthState from './context/auth/AuthState';

import PrivateRoute from './components/routes/PrivateRoute';

import authToken from './config/token';

//Revisar si hay un JWT activo
const token= localStorage.getItem('token');
if(token){
  authToken(token);
}
  

function App() {
  return (
    <ServiceState>
    <TicketState>
    <AlertState>
    <AuthState>

      <Router>
        <Routes>

          <Route exact path='/' element={ <Login/> }/>
          <Route exact path='/newAcount' element={<NewAcount/>}/>
          <Route exact path='/services' element={
            <PrivateRoute>
              <ServicesMenu/>
            </PrivateRoute>
          }/> 

        </Routes>
      </Router>

    </AuthState>      
    </AlertState>
    </TicketState>
    </ServiceState>
    
  );
}

export default App;
