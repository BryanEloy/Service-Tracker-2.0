import { useState, useContext, useEffect } from "react";
import {useNavigate } from "react-router-dom";

import AlertContext from "../../context/alerts/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
import ServiceContext from "../../context/services/ServiceContext";
import TicketContext from "../../context/tickets/TicketContext";

import Header from "../layout/Header";
import ServiceSearch from '../../components/services/ServiceSearch'


const TicketForm = () => {

    //Extraer la informacion del context de ticket
    const ticketContext= useContext(TicketContext);
    const {message, addTicket }= ticketContext; 

    //Extraer la informacion del context service
    const serviceContext= useContext(ServiceContext);
    const {actual_service, clearServices}= serviceContext;

    //Extraer la informacion del context de alerta
    const alertContext= useContext(AlertContext);
    const {alert, showAlert}= alertContext; 

    //Extraer la informacion del context de auth
    const authContext= useContext(AuthContext);
    const {autentication,userInformation}= authContext;
    
    useEffect(()=>{
        userInformation();

        if(message){
            showAlert(message.msg, message.category);
        }          
        //eslint-disable-next-line
    },[message, autentication]);


    const [ticket, setTicket]= useState({
        name:'',
        description:''
    });

    //Set the Service information in the state
    const handleChange= (e)=>{
        setTicket( {...ticket, [e.target.name]: e.target.value } )
    }
    //Use navigate para redireccionar a la pagina principal
    const history= useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        //Validar name
        if(ticket.name.trim()===''){
            showAlert('Nombre obligatorio', 'alerta-error');
            return;
        }
        if(!actual_service){
            showAlert('Selcciona un servicio para agregar el ticket', 'alerta-error');
            return;
        }
        ticket.service= actual_service._id; 

        //Pasarlo al action para guardar la info
        const success= await addTicket(ticket);
        //si hubo exito al crrar el ticket
        if(success){
            showAlert('Ticket Agregado', 'alerta-ok');
            setTimeout(() => {
                history('/search');   
            }, 1100);
            clearServices()
        }
               
    }

    return ( 
        <>
        <Header/>

        <div className="columnas">
            
            <ServiceSearch columnas={false}/>
            
            <div className=" form-service">

                {alert 
                    ?(<div className={ `alerta ${alert.category}` }> {alert.msg} </div>) 
                    :null
                }

                <div className="contenedor-form sombra-dark widht">
                    <h1>Add new Ticket</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="campo-form">
                            <p><span>Service Name: - </span>{ actual_service.name}</p>
                        </div>

                        <div className="campo-form">
                            <label htmlFor="name">Ticket Name</label>
                            <input type="text" id="name" name="name" placeholder="Name of the ticket.." value={ticket.name}
                                    onChange={handleChange}/>
                        </div>

                        <div className="campo-form">
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" name="description" value={ticket.plan}
                                    onChange={handleChange}/>
                        </div>

                        <div className="campo-form">
                            <input type="submit" className="btn btn-primario btn-block" value="Create" />
                        </div>

                    </form>
                </div>               
            </div>

        </div>      
            
        </>
     );
}
 
export default TicketForm;