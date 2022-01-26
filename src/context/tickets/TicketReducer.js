import { 
    DELETE_TICKET, 
    SELECT_TICKET, 
    SERVICE_TICKETS, 
    EDIT_TICKET, 
    CLEAR_TICKET_SELECTED,
    TICKET_ERROR,
    CLEAR_TICKETS} from "../../types"


export default (state, action)=>{

    switch (action.type) {

        //Filtra los tickets en base al serviceId para mostrar las tickets de un proyecto especifico
        case SERVICE_TICKETS:
            return{
                ...state,
                service_tickets: action.payload
            }
        //Eliminar un ticket
        case DELETE_TICKET:
            return{
                ...state,
                project_tickets: state.project_tickets.filter( ticket=> ticket._id!== action.payload)
            }
        //Editar un ticket
        case EDIT_TICKET:
            return{
                ...state,
                project_tickets: state.project_tickets.map( ticket=> ticket._id === action.payload._id
                                                            ? action.payload
                                                            : ticket)
            }
        //seleccionar un ticket
        case SELECT_TICKET:
            return{
                ...state,
                ticket_selected: action.payload
            }
        //Borrar informacion del ticket seleccionado
        case CLEAR_TICKET_SELECTED:
            return{
                ...state,
                ticket_selected: null
            }
        //Mensaje en caso de algun error
        case TICKET_ERROR:
            return{
                ...state,
                message: action.payload
            }
        //Limpiar informacion de los tickets de un servicio
        case CLEAR_TICKETS:{
            return{
              ...state,
              service_tickets: [],
              message: null
            }
        }

        default:
            return state
    }
}