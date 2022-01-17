import React, { useContext} from 'react';

import TicketContext from "../../context/tickets/TicketContext";

const Ticket = ( {ticket} ) => {

    //Obtener la iformacion del state Ticket  
    const ticketContext= useContext(TicketContext);
    const {selectTicket}= ticketContext;

    return ( 
        <>

        <button type='button' className="btn btn-blank" onClick={()=> selectTicket(ticket)}>
            {ticket.name}</button>
            
        </>
     );
}
 
export default Ticket;