import React, {useReducer} from 'react';

import ServiceContext from "./ServiceContext";
import ServiceReducer from "./ServiceReducer";

import {  
    SERVICES_GET, 
    SELECT_SERVICE, 
    DELETE_SERVICE,
    SERVICE_ERROR,
    SERVICE_SEARCH  } from '../../types';

import clienteAxios from '../../config/axios';

const ServiceState= props =>{

    const initialState={
        services: [],
        actual_service: {},
        mesage: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch]= useReducer(ServiceReducer, initialState);


    //Obtener la informacion de unn servicio 
    const getServiceInfo= async(name)=>{
        try {
            const res= await clienteAxios.get('/api/services', {params: {name}});
      
            dispatch({
                type: SERVICE_SEARCH,
                payload: res.data.services[0]
            });

        } catch (error) {
            const alert= {
                msg: 'Algo salio mal',
                category: 'alerta-error'
            }
            dispatch({
                type: SERVICE_ERROR,
                payload: alert
            });
        }
    }

    //Buscar servicios
    const getServices= async ( term='', colection='services')=>{
        try {
            const res= await clienteAxios.get( `/api/search/${colection}/${term}` );
            
            dispatch({
                type: SERVICES_GET,
                payload: res.data.results
            });

        } catch (error) {
            const alert= {
                msg: 'Algo salio mal',
                category: 'alerta-error'
            }
            dispatch({
                type: SERVICE_ERROR,
                payload: alert
            });
        }
        
    }

    //Agregar servicios
    const addService= async service=>{

        try {
            await clienteAxios.post('/api/services', service);

        } catch (error) {    
            const alert= {
                msg: error.response.data.error,
                category: 'alerta-error'
            }
            dispatch({
                type: SERVICE_ERROR,
                payload: alert
            });
        }
    }

    //Seleccionar un servicio
    const selectService= serviceId=>{
        dispatch({
            type: SELECT_SERVICE,
            payload: serviceId
        })
    }

    //Eliminar un servicio
    const deleteService= async serviceId=>{

        try {
            await clienteAxios.delete(`/api/projects/${serviceId}`);
            dispatch({
            type: DELETE_SERVICE,
            payload: serviceId
        });

        } catch (error) {
            const alert= {
                msg: 'Algo salio mal',
                category: 'alerta-error'
            }
            dispatch({
                type: SERVICE_ERROR,
                payload: alert
            });
        }        
    }

    return(
        <ServiceContext.Provider value={{
            services: state.services, 
            mesage: state.mesage,
            actual_service: state.actual_service,
            getServices,
            addService,
            selectService,
            deleteService,
            getServiceInfo
            }}
        >
            {props.children}
        </ServiceContext.Provider>
    )
}

export default ServiceState;