import { useContext,useState } from "react";

import ServiceContext from "../../context/services/ServiceContext";

const ServiceSearch = () => {

    //Obtener la iformacion del state Service   
    const serviceContext= useContext(ServiceContext);
    const {getServices, showError, error}= serviceContext;

    let [name, setName]= useState('');

    const handleChange= (e)=>{
        setName( name= e.target.value );
    }

    const handleClick= ()=>{
        //Validar el nombre
        const service= name.trim();
        if(service===''){
            showError();
           return 
        }

        //Obtner el servicio 
        getServices(service);
        setName(name='');       
    }

    return ( 
        <div className="contenedor-search">

            <input onChange={handleChange} value={name} 
                className="search" type="text" placeholder="&#xf002; Search.."/>
            <div>
                <input type="checkbox" /><label> Include inactive services </label>
            </div>            
            <button onClick={handleClick} className="btn btn-primario">Search</button>

            {error
                ? <p className="mensaje error">Escriba el nombre del servicio</p>
                : null
            }
        </div>
     );
}
 
export default ServiceSearch;