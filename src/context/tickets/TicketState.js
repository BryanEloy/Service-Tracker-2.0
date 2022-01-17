import React, { useReducer } from 'react';

import TicketReducer from './TicketReducer';
import TicketContext from './TicketContext';

import { 
    SERVICE_TICKETS,
    ADD_TICKET, 
    VALIDATE_TICKET, 
    DELETE_TICKET, 
    SELECT_TICKET, 
    EDIT_TICKET, 
    CLEAR_TICKET_SELECTED } from '../../types';

import clienteAxios from '../../config/axios';

const TicketState= props=>{

    const initialState={
        ticket_selected: null,
        service_tickets: [],
        error: false
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
            const res= await clienteAxios.post('/api/tickets', ticket);
            dispatch({
                type: ADD_TICKET,
                payload: res.data
            });  

        } catch (error) {
            console.log(error);
        }        
    }

    //Validar nueva ticket
    const showErrorTicket= ()=>{
        dispatch({
            type: VALIDATE_TICKET
        })
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
                ticket_selected: state.ticket_selected,
                getTickets,
                addTicket,
                showErrorTicket,
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