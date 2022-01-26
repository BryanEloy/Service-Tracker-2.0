import { useState, useContext, useEffect } from "react";
import {useNavigate } from "react-router-dom";

import AlertContext from "../../context/alerts/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
import ServiceContext from "../../context/services/ServiceContext";

import Header from "../layout/Header";

const ServiceForm = () => {

    //Extraer la informacion del context de alerta
    const alertContext= useContext(AlertContext);
    const {alert, showAlert}= alertContext; 

    //Extraer la informacion del context service
    const serviceContext= useContext(ServiceContext);
    const {mesage, addService}= serviceContext; 

    //Extraer la informacion del context de auth
    const authContext= useContext(AuthContext);
    const {autentication,userInformation}= authContext; 

     //En caso de que hay aun mensajede alerta mostramos esteo en pantalla
    useEffect(()=>{
        userInformation();

        if(mesage)
            showAlert(mesage.msg, mesage.category);

    },[mesage, autentication]);


    const [service, setService]= useState({
        name: '',
        plan: '',
        approvals: '',
        comments: '',
        testing: '',
        files: '',
        history: ''
    });

    //Set the Service information in the state
    const handleChange= (e)=>{
        setService( {...service, [e.target.name]: e.target.value } )
    }

    //Use navigate para redireccionar a la pagina principal
    const history= useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        //Validar name
        if(service.name.trim()===''){
            showAlert('Nombre obligatorio', 'alerta-error');
            return;
        }        
        //Pasarlo al action para guardar la info
        const success= await addService(service);
        //si hubo exito al crrar el servicio
        if(success){
            showAlert('Servicio Agregado', 'alerta-ok');
            setTimeout(() => {           
                history('/search');      
            }, 1100);
        }              
    }

    return ( 
         <>    
         <Header/>
            <div className=" form-service">

                {alert 
                    ?(<div className={ `alerta ${alert.category}` }> {alert.msg} </div>) 
                    :null
                }

                <div className="contenedor-form sombra-dark widht">
                    <h1>Add new Service</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="campo-form">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Service name.." value={service.name}
                                    onChange={handleChange}/>
                        </div>

                        <div className="campo-form">
                            <label htmlFor="plan">Plan</label>
                            <input type="text" id="plan" name="plan" value={service.plan}
                                    onChange={handleChange}/>
                        </div>

                        <div className="campo-form">
                            <label htmlFor="approvals">Approvals</label>
                            <input type="text" id="approvlas" name="approvals" value={service.approvals}
                                    onChange={handleChange}/>
                        </div>

                        <div className="campo-form">
                            <label htmlFor="comments">Comments</label>
                            <input type="text" id="comments" name="comments" value={service.comments}
                                    onChange={handleChange}/>
                        </div>

                        <div className="campo-form">
                            <label htmlFor="testing">Testing Data</label>
                            <input type="text" id="testing" name="testing" value={service.testing}
                                    onChange={handleChange}/>
                        </div>

                        <div className="campo-form">
                            <label htmlFor="files">Special Files</label>
                            <input type="text" id="files" name="files" value={service.files}
                                    onChange={handleChange}/>
                        </div>

                        <div className="campo-form">
                            <label htmlFor="history">History</label>
                            <input type="text" id="history" name="history" value={service.history}
                                    onChange={handleChange}/>
                        </div>

                        <div className="campo-form">
                            <input type="submit" className="btn btn-primario btn-block" value="Create"/>
                        </div>

                    </form>
                </div>
                
            </div>
        </>
     );
}
 
export default ServiceForm;