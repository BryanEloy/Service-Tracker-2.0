import { useContext,useState } from "react";

import ServiceContext from "../../context/services/ServiceContext";
import TicketContext from "../../context/tickets/TicketContext";

const ServiceSearch = ( {columnas=true} ) => {

    //Obtener la iformacion del state Service   
    const serviceContext= useContext(ServiceContext);
    const {services, getServiceInfo, getServices, showError, error}= serviceContext;

    //Obtener la iformacion del state Ticket  
    const ticketContext= useContext(TicketContext);
    const {clearTicketSelected}= ticketContext;

    let [name, setName]= useState('');

    const handleChange= (e)=>{
        setName( name= e.target.value );
    }

    const handleSubmit= ()=>{
        //Validar el nombre
        const service= name.trim();
        if(service===''){
            showError();
           return 
        }
        //Obtener servicios relacionados con la busqueda
        getServices(service);
        setName(name='');       
    }

    //Cargar la informacion del ticket selccionado en el state
    const serviceInfo=(service) =>{
        getServiceInfo(service.name);
        //eliminamos informacion sobre tickets previos
        clearTicketSelected();
    }

    return ( 
        <div className={columnas ?'columnas' : 'filas'}>

            <form className="contenedor-search" onSubmit={handleSubmit}>
                <input onChange={handleChange} value={name} 
                    className="search" type="text" placeholder="&#xf002; Search.."/>
                <div>
                    <input type="checkbox" /><label> Include inactive services </label>
                </div>            
                <button type="submit" className="btn btn-primario">Search</button>
                {error
                    ? <p className="mensaje error">Search by service's name</p>
                    : null
                }
            </form>

            <div className="border border-radius">
                <h3>Results:</h3>
                {services
                    ?services.map( (service, index) =>(
                        <button key={index} type='button' className="btn btn-blank" onClick={()=> serviceInfo(service)}>
                        - {service.name}</button>
                    ))
                    :null
                }
            </div>
        </div>
        
     );
}
 
export default ServiceSearch;