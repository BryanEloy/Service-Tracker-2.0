import React, {useReducer} from 'react';

import ServiceContext from "./ServiceContext";
import ServiceReducer from "./ServiceReducer";

import { 
    SERVICE_ADD, 
    SERVICE_FORM, 
    SERVICES_GET, 
    VALIDATE_FORM, 
    SELECT_SERVICE, 
    DELETE_SERVICE,
    SERVICE_ERROR  } from '../../types';

import clienteAxios from '../../config/axios';

const ServiceState= props =>{

    const initialState={
        services: {},
        form: false,
        error: false,
        actual_service: null,
        mesage: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch]= useReducer(ServiceReducer, initialState);

    //Mostrar el formulario
    const showForm= ()=>{
        dispatch({
            type: SERVICE_FORM
        })
    }

    //Obtener servicios
    const getServices= async (name)=>{
        
        try {
            const res= await clienteAxios.get('/api/services', {params: {name}});

            
            dispatch({
                type: SERVICES_GET,
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

    //Agregar servicios
    const addService= async service=>{

        try {
            const res= await clienteAxios.post('/api/services', service);
            //Agregar el servicio en el state
            dispatch({
                type: SERVICE_ADD,
                payload: res.data.service
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

    //Validar errores en el formulario
    const showError= ()=>{
        dispatch({
            type: VALIDATE_FORM
        })
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
            form: state.form,
            error: state.error,
            mesage: state.mesage,
            actual_service: state.actual_service,
            showForm,
            showError,
            getServices,
            addService,
            selectService,
            deleteService
            }}
        >
            {props.children}
        </ServiceContext.Provider>
    )
}

export default ServiceState;