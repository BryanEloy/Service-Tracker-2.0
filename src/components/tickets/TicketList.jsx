import React, { useContext, useEffect} from 'react';

import TicketContext from "../../context/tickets/TicketContext";
import ServiceContext from "../../context/services/ServiceContext";

import Ticket from "./Ticket";

const Tickets = () => { 

    //Obtener la iformacion del state Service   
    const serviceContext= useContext(ServiceContext);
    const {services}= serviceContext;

    //Obtener la iformacion del state Ticket  
    const ticketContext= useContext(TicketContext);
    const {service_tickets, ticket_selected, getTickets}= ticketContext;

    useEffect(()=>{
        //Obtenemos los tickets del servvicio
        if(services)       
            getTickets(services._id);

    },[services])

    return ( 

        <div className="columnas-margen">

            <div className="border">
                <h3>Ticket History</h3>
                <ul className="listado-tareas">
                    {service_tickets.length===0
                        ?   null
                        :   service_tickets.map( (ticket, index) =>(
                                    <Ticket  key={index} ticket={ticket} />                              
                            ))
                    }
                </ul>
            </div>

            <div className="border">
                {ticket_selected
                    ?   <div>
                            <h3>{ticket_selected.name} </h3>
                            <p> <span>Description:</span> {ticket_selected.description}</p>
                            <p>< span>Date: </span> { ticket_selected.date.toString().split('T')[0] }</p>
                        </div> 
                       
                    :null
                }
            </div>
        </div>
     );
}
 
export default Tickets;