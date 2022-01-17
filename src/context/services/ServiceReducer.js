import { 
    SERVICE_ADD, 
    SERVICE_FORM, 
    SERVICES_GET, 
    VALIDATE_FORM, 
    SELECT_SERVICE, 
    DELETE_SERVICE,
    SERVICE_ERROR } from "../../types"

export default (state, action)=>{

    switch(action.type){

        //Setea el form a true para mostrarlo
        case SERVICE_FORM:
            return{
                ...state,
                form: true
            }
        //Carga la informacion de los servicios
        case SERVICES_GET:
            return{
                ...state,
                services: action.payload,
                error: false
            }
        //Agregar un nuevo servicio al arreglo de servicios
        case SERVICE_ADD:
            return{
                ...state,
                services: [...state.services, action.payload],
                form: false,
                error: false
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
        //En caso de que la informacion ingresada sea incorrecta setea el error a true
        case VALIDATE_FORM:
        return{
            ...state,
            error: true
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