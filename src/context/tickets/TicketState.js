import React, { useReducer } from 'react';

import TicketReducer from './TicketReducer';
import TicketContext from './TicketContext';

import { 
    SERVICE_TICKETS,
    DELETE_TICKET, 
    SELECT_TICKET, 
    EDIT_TICKET, 
    CLEAR_TICKET_SELECTED,
    TICKET_ERROR,
    CLEAR_TICKETS } from '../../types';

import clienteAxios from '../../config/axios';

const TicketState= props=>{

    const initialState={
        ticket_selected: null,
        service_tickets: [],
        error: null,
        message: null
    }

    //Crear el dispatch y el state
    const [state, dispatch]= useReducer(TicketReducer, initialState);

    //Obtener tickets del servicio
    const getTickets= async (service)=>{
        try {
            const res= await clienteAxios.get( '/api/tickets', {params: {service}} );
            dispatch({
                type: SERVICE_TICKETS,
                payload: res.data.tickets
            });  

        } catch (error) {
            console.log(error);
        }
    }

    //Agregar nuevo ticket al servicio
    const addTicket= async ticket=>{
        try {
            await clienteAxios.post('/api/tickets', ticket);
            dispatch({type: CLEAR_TICKETS});
            return true

        } catch (error) {
            const alert= {
                msg: error.response.data.error,
                category: 'alerta-error'
            }
            dispatch({
                type: TICKET_ERROR,
                payload: alert
            });
        }        
    }

    //Eliminar ticket
    const deleteTicket= async (id, ticket)=>{

        try {
            await clienteAxios.delete(`/api/tickets/${id}`, {params: {ticket}} )
            dispatch({
                type: DELETE_TICKET,
                payload: id
            }); 
        } catch (error) {
            console.log(error);
        }
        
    }

    //selecionar un ticket
    const selectTicket= (ticket)=>{
        dispatch({
            type: SELECT_TICKET,
            payload: ticket
        })
    }

    //Editar un ticket
    const editTicket= async ticket=>{
        try {
            const res= await clienteAxios.put(`/api/tickets/${ticket._id}`, ticket);
            dispatch({
                type: EDIT_TICKET,
                payload: res.data.ticket
            });

        } catch (error) {
            console.log(error);
        }
        
    }

    //Borrar el ticket del state
    const clearTicketSelected= ()=>{
        dispatch({
           type: CLEAR_TICKET_SELECTED 
        }) 
    }

    return(
        <TicketContext.Provider 
            value={{
                service_tickets: state.service_tickets,
                error: state.error,
                message: state.message,
                ticket_selected: state.ticket_selected,
                getTickets,
                addTicket,
                deleteTicket,
                selectTicket,
                editTicket,
                clearTicketSelected
            }}
        >
            {props.children}
        </TicketContext.Provider>
    )
}

export default TicketState;