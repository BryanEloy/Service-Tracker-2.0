import { useState, useContext, useEffect } from "react";

import ServiceContext from "../../context/services/ServiceContext";

const ServiceData = () => {

    //Obtener la iformacion del state Service   
    const serviceContext= useContext(ServiceContext);
    const {actual_service}= serviceContext;

    const [data, setData]= useState({
        info:'',
        available: true,
    });

    useEffect(()=>{
        setData({...data, info:'', available: true});
    },[actual_service]);

    const getTestingData=()=>{
        if(!actual_service.testing){
            setData({...data, available: false});
            return
        }
        setData( {...data, 
            info: actual_service.testing,
            available: true
        });
    }

    const getHistoryData=()=>{
        if(!actual_service.history){
            setData({...data, available: false});
            return
        }
        setData( {...data,
            available: true,
            info: actual_service.history
        });
    }

    const getSpecialData=()=>{
        if(!actual_service.files){
            setData({...data, available: false});
            return
        }
        setData( {...data,
            available: true,
            info: actual_service.files
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
                    : <p>No Data</p>
                }
            </div>
            
        </div>
     );
}
 
export default ServiceData;