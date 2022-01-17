import { 
    ADD_TICKET, 
    DELETE_TICKET, 
    SELECT_TICKET, 
    SERVICE_TICKETS, 
    VALIDATE_TICKET, 
    EDIT_TICKET, 
    CLEAR_TICKET_SELECTED } from "../../types"


export default (state, action)=>{

    switch (action.type) {

        //Filtra los tickets en base al serviceId para mostrar las tickets de un proyecto especifico
        case SERVICE_TICKETS:
            return{
                ...state,
                service_tickets: action.payload
            }

        //Agrega un nuevo ticket al proyecto
        case ADD_TICKET:
            return{
                ...state,
                project_tickets: [...state.project_tickets, action.payload],
                error: false
            }
        //Validar ticket
        case VALIDATE_TICKET:
            return{
                ...state,
                error: true
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
        //seleccionar un ticket
        case CLEAR_TICKET_SELECTED:
            return{
                ...state,
                ticket_selected: null
            }

        default:
            return state
    }
}