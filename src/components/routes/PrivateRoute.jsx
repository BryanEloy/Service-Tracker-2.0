import { useContext, useEffect } from "react";
import { Navigate} from 'react-router-dom';
import AuthContext from "../../context/auth/AuthContext";

const PrivateRoute = ( {children} ) => {

    //Extraer la informacion del context de auth
    const authContext= useContext(AuthContext);
    const {autentication, userInformation, chargin}= authContext; 

    useEffect(()=>{
        userInformation();
        //eslint-disbale-next-line
    },[]);

    return !autentication && chargin ? <Navigate to="/" /> : children 
}
 
export default PrivateRoute;