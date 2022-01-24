import { 
    SERVICES_GET,  
    SELECT_SERVICE, 
    DELETE_SERVICE,
    SERVICE_ERROR,
    SERVICE_SEARCH } from "../../types"

export default (state, action)=>{

    switch(action.type){

        //Obtener los servicios relacionados con la busqueda
        case SERVICES_GET:
            return{
                ...state,
                services: action.payload,
                mesage: null
            }
        //Obtener la informacion de un servicio
        case SERVICE_SEARCH:
            return{
                ...state,
                actual_service: action.payload,
                mesage: null
            }
        //Setear la informacion del servicio seleccionado en el state
        case SELECT_SERVICE:
            return{
                ...state,
                actual_service: state.services.filter( service=> service._id=== action.payload)
            }
        //Eliminar un servicio
        case DELETE_SERVICE:
            return{
                ...state,
                services: state.services.filter( service=> service._id!== action.payload),
                actual_service: null
            }    

        //Mensaje en caso de algun error
        case SERVICE_ERROR:
            return{
                ...state,
                mesage: action.payload
            }
            
        default:
            return state
    }
}