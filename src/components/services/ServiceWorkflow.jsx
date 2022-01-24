import { useContext } from 'react';

import ServiceContext from '../../context/services/ServiceContext';

const ServiceWorkflow = () => {

    //Extraer la informacion del context de auth
    const serviceContext= useContext(ServiceContext);
    const {actual_service}= serviceContext; 

    return ( 
        <div className="border">
            <h2>Workflow</h2>
            <div className="campo-form">
                <p><span>Service Name: - </span>{ actual_service.name}</p>
            </div>

            <div className='border-bottom'>
               <h3>Plan</h3>
                <p>{actual_service.plan}</p> 
            </div>
            
            <div className='border-bottom'>
              <h3>Approvals</h3>
                <p>{actual_service.approvals}</p>  
            </div>
            
            <div>
               <h3>Comments</h3>
                <p>{actual_service.comments}</p> 
            </div>
            
        </div>
     );
}
 
export default ServiceWorkflow;