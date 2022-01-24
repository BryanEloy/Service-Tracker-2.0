import { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";

import AuthContext from '../../context/auth/AuthContext';

const Header = () => {

    //Extraer la informacion del context de auth
    const authContext= useContext(AuthContext);
    const {user, logOut, userInformation}= authContext; 

    useEffect(()=>{
        userInformation();
        //eslint-disable-next-line
    },[]);

    return ( 
        <header className="app-header">
            <div className='separacion'>
                <a className="logo" href='#!'></a>
                <h3 className='titulo'>Serarch by services</h3>
            </div>
                                    
            <div className='contenedor-header'>              
                {user 
                    ?<p className="nombre-usuario"> Hello <span>{user.name}</span></p>
                    : null} 
                <nav className="nav-principal">
                    <Link to={'/services'} className="btn btn-nav">Add Services</Link>
                    <Link to={'/tickets'} className="btn btn-nav">Add Tickets</Link>
                    <button className="btn btn-logOut" onClick={()=> logOut()}>Logout</button>
                </nav> 
            </div>
        
        </header>
     );
}
 
export default Header;