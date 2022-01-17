import { useContext } from 'react';

import ServiceContext from '../../context/services/ServiceContext';

const ServiceWorkflow = () => {

    //Extraer la informacion del context de auth
    const serviceContext= useContext(ServiceContext);
    const {services}= serviceContext; 

    return ( 
        <div className="border">
            <h2>Workflow</h2>

            <div className='border-bottom'>
               <h3>Plan</h3>
                <p>{services.plan}</p> 
            </div>
            
            <div className='border-bottom'>
              <h3>Approvals</h3>
                <p>{services.approvals}</p>  
            </div>
            
            <div>
               <h3>Comments</h3>
                <p>{services.comments}</p> 
            </div>
            
        </div>
     );
}
 
export default ServiceWorkflow;