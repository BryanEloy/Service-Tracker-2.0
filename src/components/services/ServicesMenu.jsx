import { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/AuthContext';
import ServiceContext from '../../context/services/ServiceContext';

import Header from '../layout/Header';
import ServiceWorkflow from './ServiceWorkflow';
import ServiceData from './ServiceData';
import Tickets from '../tickets/TicketList';
import ServiceSearch from './ServiceSearch';


const ServicesMenu = () => {

    //Extraer la informacion del context de auth
    const authContext= useContext(AuthContext);
    const {userInformation}= authContext; 

    //Extraer la informacion del context de auth
    const serviceContext= useContext(ServiceContext);
    const {clearServices}= serviceContext; 
    
    //Cuando se cargue la pagina de servicios vamos a llamar a la funcion par atraer la info del user
    useEffect(()=>{
        userInformation();
        clearServices();
    },[]);

    return ( 
        <div className="contenedor-app">

            <div className="seccion-principal">
                <Header/>
                <ServiceSearch/>
                <main className='columnas'>
                    <ServiceWorkflow/>
                    <div className='filas'>
                        <ServiceData/>
                        <Tickets/>
                    </div>
                </main>

            </div>
        </div>
    );
}
 
export default ServicesMenu;