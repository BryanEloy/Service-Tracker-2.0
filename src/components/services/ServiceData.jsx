import { useState, useContext } from "react";

import ServiceContext from "../../context/services/ServiceContext";

const ServiceData = () => {

    //Obtener la iformacion del state Service   
    const serviceContext= useContext(ServiceContext);
    const {services}= serviceContext;

    const [data, setData]= useState({
        info:'',
        available: true,
    });

    const getTestingData=()=>{
        if(!services.testing){
            setData({...data, available: false});
            return
        }
        setData( {...data, 
            info: services.testing,
            available: true
        });
    }

    const getHistoryData=()=>{
        if(!services.history){
            setData({...data, available: false});
            return
        }
        setData( {...data,
            available: true,
            info: services.history
        });
    }

    const getSpecialData=()=>{
        if(!services.files){
            setData({...data, available: false});
            return
        }
        setData( {...data,
            available: true,
            info: services.files
        });
    }

    return ( 
        <div className="border">

                <button onClick={ ()=> getTestingData() } className="border-bottom btn-secundario space">
                    Testing Data</button>
                <button onClick={ ()=> getSpecialData() } className="border-bottom btn-secundario space">
                    Special Files</button>
                <button onClick={ ()=> getHistoryData() } className="border-bottom btn-secundario space">
                    History</button>

            <div>
                {data.available
                    ?  <p>{data.info}</p>
                    : <p>No hay informacion</p>
                }
            </div>
            
        </div>
     );
}
 
export default ServiceData;